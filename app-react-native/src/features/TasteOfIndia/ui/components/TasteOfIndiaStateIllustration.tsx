import React, { memo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import type { TasteOfIndiaState } from '../../types';
import { TasteOfIndiaImage } from './TasteOfIndiaImage';

type TasteOfIndiaStateIllustrationProps = {
  state: TasteOfIndiaState;
  style?: StyleProp<ViewStyle>;
  fit?: 'cropped' | 'contain';
};

export const TasteOfIndiaStateIllustration = memo(
  function TasteOfIndiaStateIllustration({
    state,
    style,
    fit = 'cropped',
  }: TasteOfIndiaStateIllustrationProps) {
    const crop = fit === 'cropped' ? state.illustrationCrop : undefined;
    return (
      <View style={[styles.root, style]}>
        <TasteOfIndiaImage
          assetKey={state.illustrationKey}
          resizeMode={fit === 'contain' ? 'contain' : 'cover'}
          style={crop ? { position: 'absolute', ...crop } : styles.fill}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  root: { width: 100, height: 48, overflow: 'hidden' },
  fill: StyleSheet.absoluteFill,
});
