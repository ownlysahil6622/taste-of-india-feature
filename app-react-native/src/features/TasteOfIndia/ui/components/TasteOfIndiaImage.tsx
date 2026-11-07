import FastImage, {
  type ImageStyle,
  type ResizeMode,
} from '@d11/react-native-fast-image';
import React, { memo } from 'react';
import { Image, StyleSheet, View, type StyleProp } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { resolveTasteOfIndiaAsset } from '../../assets/resolveTasteOfIndiaAsset';

type TasteOfIndiaImageProps = {
  assetKey: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
};

export const TasteOfIndiaImage = memo(function TasteOfIndiaImage({
  assetKey,
  style,
  resizeMode = 'stretch',
}: TasteOfIndiaImageProps) {
  const asset = resolveTasteOfIndiaAsset(assetKey);
  if (!asset) return null;

  if (asset.kind === 'raster') {
    if (typeof asset.source === 'number') {
      return (
        <View style={style as never}>
          <Image
            source={asset.source}
            style={styles.localImage}
            resizeMode={resizeMode}
          />
        </View>
      );
    }
    return (
      <FastImage source={asset.source} style={style} resizeMode={resizeMode} />
    );
  }

  if (asset.kind === 'svg') {
    const { Component } = asset;
    return <Component width="100%" height="100%" style={style as never} />;
  }

  return (
    <SvgUri uri={asset.uri} width="100%" height="100%" style={style as never} />
  );
});

const styles = StyleSheet.create({
  localImage: { width: '100%', height: '100%' },
});
