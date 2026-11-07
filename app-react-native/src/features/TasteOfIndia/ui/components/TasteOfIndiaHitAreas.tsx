import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import {
  TASTE_OF_INDIA_DESIGN_HEIGHT,
  TASTE_OF_INDIA_DESIGN_WIDTH,
  TASTE_OF_INDIA_MARKER_ANCHOR_CENTER_X,
  TASTE_OF_INDIA_MARKER_HIT_RADIUS,
  TASTE_OF_INDIA_MARKER_HIT_SIZE,
} from '../../constants';
import type { TasteOfIndiaState } from '../../types';

type TasteOfIndiaHitAreasProps = {
  states: readonly TasteOfIndiaState[];
  containerWidth: number;
  onSelectState: (state: TasteOfIndiaState) => void;
};

export const TasteOfIndiaHitAreas = memo(function TasteOfIndiaHitAreas({
  states,
  containerWidth,
  onSelectState,
}: TasteOfIndiaHitAreasProps) {
  return (
    <>
      <Svg
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
        viewBox={`0 0 ${TASTE_OF_INDIA_DESIGN_WIDTH} ${TASTE_OF_INDIA_DESIGN_HEIGHT}`}
        preserveAspectRatio="none"
      >
        {states.map(state => (
          <Path
            key={state.name}
            d={state.hitboxPath}
            fill="transparent"
            onPress={() => onSelectState(state)}
          />
        ))}
      </Svg>
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        {states.map(state => (
          <Pressable
            key={state.name}
            style={[styles.target, state.target]}
            onPress={() => onSelectState(state)}
            accessibilityRole="button"
            accessibilityLabel={`Open ${state.name} dishes from its marker or name`}
          />
        ))}
      </View>
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        {states.map(state => (
          <Pressable
            key={state.name}
            style={[
              styles.markerTarget,
              {
                left:
                  containerWidth / 2 +
                  (state.markerAnchor.x -
                    TASTE_OF_INDIA_MARKER_ANCHOR_CENTER_X) -
                  TASTE_OF_INDIA_MARKER_HIT_SIZE / 2,
                top: state.markerAnchor.y - TASTE_OF_INDIA_MARKER_HIT_SIZE / 2,
              },
            ]}
            onPress={() => onSelectState(state)}
            accessibilityRole="button"
            accessibilityLabel={`Select ${state.name} from its food marker`}
          />
        ))}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  target: { position: 'absolute' },
  markerTarget: {
    position: 'absolute',
    width: TASTE_OF_INDIA_MARKER_HIT_SIZE,
    height: TASTE_OF_INDIA_MARKER_HIT_SIZE,
    borderRadius: TASTE_OF_INDIA_MARKER_HIT_RADIUS,
  },
});
