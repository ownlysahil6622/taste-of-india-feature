import type { ViewStyle } from 'react-native';

import {
  TASTE_OF_INDIA_FOCUS_BOTTOM_GAP,
  TASTE_OF_INDIA_FOCUS_SCALE,
  TASTE_OF_INDIA_HEADER_BLUR_HEIGHT,
  TASTE_OF_INDIA_MAP_TOP,
  TASTE_OF_INDIA_MAP_ART_BOTTOM,
  TASTE_OF_INDIA_MAP_CENTER_OFFSET,
  TASTE_OF_INDIA_MAP_SIZE,
  TASTE_OF_INDIA_MARKER_ANCHOR_CENTER_X,
  TASTE_OF_INDIA_PAN_EDGE_MARGIN,
  TASTE_OF_INDIA_PAN_RANGE_X,
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
  const scale = TASTE_OF_INDIA_FOCUS_SCALE;
  const visibleBottom = height - obstruction;
  const pointX = width / 2 + (anchor.x - TASTE_OF_INDIA_MARKER_ANCHOR_CENTER_X);
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
    translateX: Math.min(maxX, Math.max(minX, width / 2 - scale * pointX)),
    translateY: Math.min(0, Math.max(minY, visibleBottom / 2 - scale * pointY)),
  };
};

type MapPanBoundsInput = {
  width: number;
  height: number;
  obstruction: number;
  scale: number;
  restX: number;
  markerTop: number;
  markerBottom: number;
};

export const computeMapPanBounds = ({
  width,
  height,
  obstruction,
  scale,
  restX,
  markerTop,
  markerBottom,
}: MapPanBoundsInput) => {
  const visibleBottom = height - obstruction;
  return {
    minX: restX - TASTE_OF_INDIA_PAN_RANGE_X,
    maxX: restX + TASTE_OF_INDIA_PAN_RANGE_X,
    minY:
      TASTE_OF_INDIA_HEADER_BLUR_HEIGHT +
      TASTE_OF_INDIA_PAN_EDGE_MARGIN -
      scale * markerBottom,
    maxY: visibleBottom - TASTE_OF_INDIA_PAN_EDGE_MARGIN - scale * markerTop,
  };
};
