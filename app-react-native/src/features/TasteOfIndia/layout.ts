import type { ViewStyle } from 'react-native';

import {
  TASTE_OF_INDIA_FOCUS_BOTTOM_GAP,
  TASTE_OF_INDIA_FOCUS_CONTENT_EDGE_MARGIN,
  TASTE_OF_INDIA_FOCUS_CONTENT_LEFT,
  TASTE_OF_INDIA_FOCUS_CONTENT_RIGHT,
  TASTE_OF_INDIA_FOCUS_SCALE,
  TASTE_OF_INDIA_HEADER_BLUR_HEIGHT,
  TASTE_OF_INDIA_MAP_TOP,
  TASTE_OF_INDIA_MAP_ART_BOTTOM,
  TASTE_OF_INDIA_MAP_CENTER_OFFSET,
  TASTE_OF_INDIA_MAP_SIZE,
  TASTE_OF_INDIA_MAX_VERTICAL_DRAG,
  TASTE_OF_INDIA_MARKER_ANCHOR_CENTER_X,
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
  obstruction: number;
  anchor: { x: number; y: number } | null;
};

export const IDENTITY_MAP_FOCUS = { scale: 1, translateX: 0, translateY: 0 };

export const computeMapFocus = ({
  width,
  height,
  obstruction,
  anchor,
}: MapFocusInput) => {
  if (!anchor) {
    return IDENTITY_MAP_FOCUS;
  }
  const contentHalfWidth =
    (TASTE_OF_INDIA_FOCUS_CONTENT_RIGHT - TASTE_OF_INDIA_FOCUS_CONTENT_LEFT) /
    2;
  const scale = Math.max(
    1,
    Math.min(
      TASTE_OF_INDIA_FOCUS_SCALE,
      (width / 2 - TASTE_OF_INDIA_FOCUS_CONTENT_EDGE_MARGIN) / contentHalfWidth,
    ),
  );
  const visibleBottom = height - obstruction;
  // Same for every state: centre the full marker/label span horizontally,
  // so switching states only moves the map vertically.
  const contentCenterX =
    width / 2 +
    ((TASTE_OF_INDIA_FOCUS_CONTENT_LEFT + TASTE_OF_INDIA_FOCUS_CONTENT_RIGHT) /
      2 -
      TASTE_OF_INDIA_MARKER_ANCHOR_CENTER_X);
  const pointY = anchor.y;
  const mapLeft =
    width / 2 + TASTE_OF_INDIA_MAP_CENTER_OFFSET - TASTE_OF_INDIA_MAP_SIZE / 2;
  const minX = width - scale * (mapLeft + TASTE_OF_INDIA_MAP_SIZE);
  const maxX = -scale * mapLeft;
  const minY =
    visibleBottom -
    TASTE_OF_INDIA_FOCUS_BOTTOM_GAP -
    scale * TASTE_OF_INDIA_MAP_ART_BOTTOM;
  return {
    scale,
    translateX: Math.min(
      maxX,
      Math.max(minX, width / 2 - scale * contentCenterX),
    ),
    translateY: Math.min(0, Math.max(minY, visibleBottom / 2 - scale * pointY)),
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
  markerTop,
  markerBottom,
}: MapPanBoundsInput) => {
  if (locked) {
    // No state selected: the map can't be dragged at all.
    return { minX: restX, maxX: restX, minY: restY, maxY: restY };
  }
  const visibleBottom = height - obstruction;
  const markerMinY =
    TASTE_OF_INDIA_HEADER_BLUR_HEIGHT +
    TASTE_OF_INDIA_PAN_EDGE_MARGIN -
    scale * markerBottom;
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
