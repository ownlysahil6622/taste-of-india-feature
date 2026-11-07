import type { ViewStyle } from 'react-native';

import {
  TASTE_OF_INDIA_CONTENT_BOUNDS,
  TASTE_OF_INDIA_FIT_GAP_Y,
  TASTE_OF_INDIA_FIT_MARGIN_X,
  TASTE_OF_INDIA_FOCUS_BOTTOM_GAP,
  TASTE_OF_INDIA_FOCUS_SCALE,
  TASTE_OF_INDIA_LABEL_BOUNDS,
  TASTE_OF_INDIA_MAX_FIT_SCALE,
  TASTE_OF_INDIA_MAX_VERTICAL_DRAG,
  TASTE_OF_INDIA_PAN_EDGE_MARGIN,
} from './constants';
import type { TasteOfIndiaInset } from './types';

export const resolveInsetStyle = (
  inset: TasteOfIndiaInset,
  parentWidth: number,
  parentHeight: number,
): ViewStyle => {
  const [top, right, bottom, left] = inset.map(
    value => parseFloat(value) / 100,
  );
  return {
    position: 'absolute',
    left: parentWidth * left,
    top: parentHeight * top,
    width: parentWidth * (1 - left - right),
    height: parentHeight * (1 - top - bottom),
  };
};

type MapFocusInput = {
  width: number;
  height: number;
  /** Height of whatever covers the bottom now (discovery tip or state sheet). */
  obstruction: number;
  /** Last measured discovery-tip height; the default view fits above it. */
  tipHeight: number;
  headerHeight: number;
  anchor: { x: number; y: number } | null;
};

const CONTENT_CENTER_X =
  (TASTE_OF_INDIA_CONTENT_BOUNDS.left + TASTE_OF_INDIA_CONTENT_BOUNDS.right) /
  2;
const CONTENT_CENTER_Y =
  (TASTE_OF_INDIA_CONTENT_BOUNDS.top + TASTE_OF_INDIA_CONTENT_BOUNDS.bottom) /
  2;

/** Scale at which the whole content fits between the header and the tip. */
export const computeFitScale = ({
  width,
  height,
  tipHeight,
  headerHeight,
}: Pick<MapFocusInput, 'width' | 'height' | 'tipHeight' | 'headerHeight'>) => {
  const availableWidth = width - 2 * TASTE_OF_INDIA_FIT_MARGIN_X;
  const availableHeight =
    height - tipHeight - headerHeight - 2 * TASTE_OF_INDIA_FIT_GAP_Y;
  return Math.max(
    0.1,
    Math.min(
      TASTE_OF_INDIA_MAX_FIT_SCALE,
      availableWidth /
        (TASTE_OF_INDIA_CONTENT_BOUNDS.right -
          TASTE_OF_INDIA_CONTENT_BOUNDS.left),
      availableHeight /
        (TASTE_OF_INDIA_CONTENT_BOUNDS.bottom -
          TASTE_OF_INDIA_CONTENT_BOUNDS.top),
    ),
  );
};

export const computeMapFocus = ({
  width,
  height,
  obstruction,
  tipHeight,
  headerHeight,
  anchor,
}: MapFocusInput) => {
  const fit = computeFitScale({ width, height, tipHeight, headerHeight });
  if (!anchor) {
    // Default view: content centred between the header and the tip.
    const visibleBottom = height - tipHeight;
    return {
      scale: fit,
      translateX: width / 2 - fit * CONTENT_CENTER_X,
      translateY: (headerHeight + visibleBottom) / 2 - fit * CONTENT_CENTER_Y,
    };
  }
  // Same for every state: zoom on top of the fit, keeping every label inside
  // the side margins.
  const labelFit =
    (width / 2 - TASTE_OF_INDIA_FIT_MARGIN_X) /
    Math.max(
      CONTENT_CENTER_X - TASTE_OF_INDIA_LABEL_BOUNDS.left,
      TASTE_OF_INDIA_LABEL_BOUNDS.right - CONTENT_CENTER_X,
    );
  const scale = Math.min(
    fit * TASTE_OF_INDIA_FOCUS_SCALE,
    Math.max(fit, labelFit),
  );
  const visibleBottom = height - obstruction;
  const maxY =
    headerHeight +
    TASTE_OF_INDIA_FIT_GAP_Y -
    scale * TASTE_OF_INDIA_CONTENT_BOUNDS.top;
  const minY =
    visibleBottom -
    TASTE_OF_INDIA_FOCUS_BOTTOM_GAP -
    scale * TASTE_OF_INDIA_CONTENT_BOUNDS.bottom;
  return {
    scale,
    // Same X for every state (and the default view): only vertical movement.
    translateX: width / 2 - scale * CONTENT_CENTER_X,
    translateY: Math.min(
      maxY,
      Math.max(minY, (headerHeight + visibleBottom) / 2 - scale * anchor.y),
    ),
  };
};

type MapPanBoundsInput = {
  width: number;
  height: number;
  obstruction: number;
  scale: number;
  restX: number;
  restY: number;
  locked: boolean;
  headerHeight: number;
  markerTop: number;
  markerBottom: number;
};

export const computeMapPanBounds = ({
  width,
  height,
  obstruction,
  scale,
  restX,
  restY,
  locked,
  headerHeight,
  markerTop,
  markerBottom,
}: MapPanBoundsInput) => {
  if (locked) {
    // No state selected: the map can't be dragged at all.
    return { minX: restX, maxX: restX, minY: restY, maxY: restY };
  }
  const visibleBottom = height - obstruction;
  const markerMinY =
    headerHeight + TASTE_OF_INDIA_PAN_EDGE_MARGIN - scale * markerBottom;
  const markerMaxY =
    visibleBottom - TASTE_OF_INDIA_PAN_EDGE_MARGIN - scale * markerTop;
  // Use whichever limit is tighter: the marker limits or
  // TASTE_OF_INDIA_MAX_VERTICAL_DRAG from the resting position.
  let minY = Math.max(markerMinY, restY - TASTE_OF_INDIA_MAX_VERTICAL_DRAG);
  let maxY = Math.min(markerMaxY, restY + TASTE_OF_INDIA_MAX_VERTICAL_DRAG);
  if (minY > maxY) {
    // Rest sits more than the max drag outside the marker limits:
    // hold at the nearest marker limit, as the clamp does today.
    minY = maxY = Math.min(markerMaxY, Math.max(markerMinY, restY));
  }
  return {
    // Horizontal drag is locked: the map only scrolls vertically.
    minX: restX,
    maxX: restX,
    minY,
    maxY,
  };
};
