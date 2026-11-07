import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { resolveInsetStyle } from '../../layout';
import type { TasteOfIndiaMapLayer } from '../../types';
import { TasteOfIndiaImage } from './TasteOfIndiaImage';

type TasteOfIndiaMapLayersProps = {
  layers: readonly TasteOfIndiaMapLayer[];
  width: number;
  height: number;
  selectedLayerKeys: Readonly<Record<string, string>>;
  selectedState?: string;
};

type MapLayerNodeProps = {
  layer: TasteOfIndiaMapLayer;
  width: number;
  height: number;
  selectedLayerKeys: Readonly<Record<string, string>>;
  selectedState?: string;
};

const MapLayerNode = memo(function MapLayerNode({
  layer,
  width,
  height,
  selectedLayerKeys,
  selectedState,
}: MapLayerNodeProps) {
  if (layer.kind === 'image') {
    return <TasteOfIndiaImage assetKey={layer.assetKey} style={styles.fill} />;
  }

  if (layer.kind === 'state') {
    const isActive = selectedState === layer.state;
    return (
      <View style={styles.fill}>
        <View style={[styles.fill, isActive ? styles.hidden : undefined]}>
          <TasteOfIndiaImage
            assetKey={layer.dormantAssetKey}
            style={styles.fill}
          />
        </View>
        <View style={[styles.fill, isActive ? undefined : styles.hidden]}>
          <TasteOfIndiaImage
            assetKey={selectedLayerKeys[layer.state]}
            style={styles.fill}
          />
        </View>
      </View>
    );
  }

  const resolved = layer.inset
    ? resolveInsetStyle(layer.inset, width, height)
    : null;
  const boxStyle = resolved ?? styles.fill;
  const boxWidth = typeof resolved?.width === 'number' ? resolved.width : width;
  const boxHeight =
    typeof resolved?.height === 'number' ? resolved.height : height;

  return (
    <View style={boxStyle}>
      {layer.children.map((child, index) => (
        <MapLayerNode
          key={index}
          layer={child}
          width={boxWidth}
          height={boxHeight}
          selectedLayerKeys={selectedLayerKeys}
          selectedState={selectedState}
        />
      ))}
    </View>
  );
});

export const TasteOfIndiaMapLayers = memo(function TasteOfIndiaMapLayers({
  layers,
  width,
  height,
  selectedLayerKeys,
  selectedState,
}: TasteOfIndiaMapLayersProps) {
  return (
    <>
      {layers.map((layer, index) => (
        <MapLayerNode
          key={index}
          layer={layer}
          width={width}
          height={height}
          selectedLayerKeys={selectedLayerKeys}
          selectedState={selectedState}
        />
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  fill: StyleSheet.absoluteFill,
  hidden: { opacity: 0 },
});
