import React, { memo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  TASTE_OF_INDIA_COLORS,
  TASTE_OF_INDIA_MARKER_SHADOW_GRADIENT,
  TASTE_OF_INDIA_FONTS,
  TASTE_OF_INDIA_SHEET_SHADOW,
} from '../../constants';
import { resolveInsetStyle } from '../../layout';
import type { TasteOfIndiaMarker } from '../../types';
import { TasteOfIndiaImage } from './TasteOfIndiaImage';
import { TasteOfIndiaText } from './TasteOfIndiaText';
import { useMarkerBounce } from './useMarkerBounce';

const DESSERT_ICON_KEY = '4b1c5.png';
const UNION_RIGHT_KEY = '393d0.svg';
const UNION_LEFT_KEY = 'ebcb8.svg';
const UNION_MAIN_KEY = 'b472e.svg';

type TasteOfIndiaStateMarkerProps = {
  marker: TasteOfIndiaMarker;
  isSelected: boolean;
  pulse: number;
  containerWidth: number;
  containerHeight: number;
};

type SideGroupProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  tileBoxSize: number;
  rotate: string;
  unionKey: string;
  tileColor: string;
  origin: string;
  animatedStyle: ViewStyle;
};

const SideGroup = memo(function SideGroup({
  left,
  top,
  width,
  height,
  tileBoxSize,
  rotate,
  unionKey,
  tileColor,
  origin,
  animatedStyle,
}: SideGroupProps) {
  return (
    <Animated.View
      style={[
        styles.sideGroup,
        { left, top, width, height, transformOrigin: origin },
        animatedStyle,
      ]}
    >
      <View style={[styles.centered, { width, height }]}>
        <View style={[styles.unionFrame, { transform: [{ rotate }] }]}>
          <View style={styles.unionImageBox}>
            <TasteOfIndiaImage assetKey={unionKey} style={styles.fill} />
          </View>
        </View>
      </View>
      <View
        style={[
          styles.centered,
          styles.tileBox,
          { width: tileBoxSize, height: tileBoxSize },
        ]}
      >
        <View style={[styles.tileFrame, { transform: [{ rotate }] }]}>
          <View style={[styles.tile, { backgroundColor: tileColor }]}>
            <View style={styles.tileIcon}>
              <TasteOfIndiaImage
                assetKey={DESSERT_ICON_KEY}
                style={styles.fill}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
});

const MarkerCluster = memo(function MarkerCluster({
  marker,
  isSelected,
  pulse,
}: {
  marker: TasteOfIndiaMarker;
  isSelected: boolean;
  pulse: number;
}) {
  const { clusterStyle, leftStyle, rightStyle } = useMarkerBounce(
    isSelected,
    pulse,
  );
  const mainTileColor = isSelected
    ? TASTE_OF_INDIA_COLORS.markerSelected
    : TASTE_OF_INDIA_COLORS.markerTile;
  const leftTileColor = isSelected
    ? TASTE_OF_INDIA_COLORS.markerSelectedLeftTile
    : TASTE_OF_INDIA_COLORS.markerSideTile;
  const rightTileColor = isSelected
    ? TASTE_OF_INDIA_COLORS.markerSelectedRightTile
    : TASTE_OF_INDIA_COLORS.markerSideTile;

  return (
    <Animated.View
      style={[
        styles.cluster,
        marker.labelFirst ? null : styles.overlapTrailing,
        clusterStyle,
      ]}
    >
      <View style={styles.ellipse} />
      <SideGroup
        left={12.14}
        top={6}
        width={40.8}
        height={44.811}
        tileBoxSize={34.833}
        rotate="16deg"
        unionKey={UNION_RIGHT_KEY}
        tileColor={leftTileColor}
        origin="65% 70%"
        animatedStyle={leftStyle as ViewStyle}
      />
      <SideGroup
        left={0}
        top={6.2}
        width={42.608}
        height={46.105}
        tileBoxSize={36.095}
        rotate="-20deg"
        unionKey={UNION_LEFT_KEY}
        tileColor={rightTileColor}
        origin="35% 70%"
        animatedStyle={rightStyle as ViewStyle}
      />
      <View style={styles.mainGroup}>
        <View style={styles.mainUnion}>
          <View style={styles.mainUnionImageBox}>
            <TasteOfIndiaImage assetKey={UNION_MAIN_KEY} style={styles.fill} />
          </View>
        </View>
        <View style={[styles.mainTile, { backgroundColor: mainTileColor }]}>
          <View style={[styles.mainIcon, { left: 2 + marker.iconOffsetX }]}>
            <TasteOfIndiaImage
              assetKey={marker.iconKey}
              style={styles.fill}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <View style={styles.badge}>
        <TasteOfIndiaText style={styles.badgeText}>
          {marker.count}
        </TasteOfIndiaText>
      </View>
    </Animated.View>
  );
});

const MarkerLabel = memo(function MarkerLabel({
  marker,
  isSelected,
}: {
  marker: TasteOfIndiaMarker;
  isSelected: boolean;
}) {
  return (
    <View
      style={[
        styles.label,
        marker.labelFirst ? styles.overlapTrailing : null,
        isSelected ? styles.labelSelected : null,
      ]}
    >
      <TasteOfIndiaText
        style={[styles.labelText, isSelected ? styles.labelTextSelected : null]}
      >
        {marker.label}
      </TasteOfIndiaText>
    </View>
  );
});

const buildContainerStyle = (
  marker: TasteOfIndiaMarker,
  containerWidth: number,
  containerHeight: number,
): ViewStyle => {
  const { position } = marker;
  if (position.kind === 'inset') {
    const [top, right, bottom, left] = position.inset.map(
      value => parseFloat(value) / 100,
    );
    return {
      position: 'absolute',
      left: containerWidth * left,
      top: containerHeight * top,
      width: containerWidth * (1 - left - right),
      height: containerHeight * (1 - top - bottom),
    };
  }
  return {
    position: 'absolute',
    left: containerWidth / 2 + position.left,
    top: containerHeight / 2 + position.top,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  };
};

export const TasteOfIndiaStateMarker = memo(function TasteOfIndiaStateMarker({
  marker,
  isSelected,
  pulse,
  containerWidth,
  containerHeight,
}: TasteOfIndiaStateMarkerProps) {
  const cluster = (
    <MarkerCluster marker={marker} isSelected={isSelected} pulse={pulse} />
  );
  const label = <MarkerLabel marker={marker} isSelected={isSelected} />;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        buildContainerStyle(marker, containerWidth, containerHeight),
      ]}
    >
      {marker.labelFirst ? label : cluster}
      {marker.labelFirst ? cluster : label}
    </View>
  );
});

const styles = StyleSheet.create({
  fill: StyleSheet.absoluteFill,
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlapTrailing: { marginRight: -1 },
  cluster: {
    width: 52.94,
    height: 52.305,
    transformOrigin: '50% 70%',
  },
  ellipse: {
    position: 'absolute',
    left: 2.17,
    top: 41,
    width: 50,
    height: 14,
    backgroundImage: TASTE_OF_INDIA_MARKER_SHADOW_GRADIENT,
  },
  sideGroup: { position: 'absolute' },
  centered: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unionFrame: { width: 31.682, height: 37.532 },
  unionImageBox: resolveInsetStyle(
    ['-79.82%', '-141.83%', '-159.63%', '-141.83%'],
    31.682,
    37.532,
  ),
  tileBox: { left: 1.76, top: 1.76 },
  tileFrame: { width: 28.162, height: 28.162 },
  tile: {
    width: 28.162,
    height: 28.162,
    borderRadius: 7.04,
  },
  tileIcon: {
    position: 'absolute',
    left: 2.96,
    top: 3.71,
    width: 22.233,
    height: 22.233,
  },
  mainGroup: {
    position: 'absolute',
    left: 9.17,
    top: 5,
    width: 36,
    height: 42.648,
  },
  mainUnion: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 36,
    height: 42.648,
  },
  mainUnionImageBox: resolveInsetStyle(
    ['-56.27%', '-88.89%', '-93.79%', '-88.89%'],
    36,
    42.648,
  ),
  mainTile: {
    position: 'absolute',
    left: 2,
    top: 2,
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  mainIcon: {
    position: 'absolute',
    top: 2,
    width: 28,
    height: 28,
  },
  badge: {
    position: 'absolute',
    left: 33.17,
    top: 0,
    width: 16,
    height: 16,
    borderRadius: 888,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
  },
  badgeText: {
    position: 'absolute',
    left: 4.89,
    right: 5.78,
    top: 1.78,
    fontFamily: TASTE_OF_INDIA_FONTS.bold,
    fontSize: 10.667,
    letterSpacing: -0.64,
    color: TASTE_OF_INDIA_COLORS.black,
  },
  label: {
    paddingHorizontal: 6,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
    boxShadow: TASTE_OF_INDIA_SHEET_SHADOW,
  },
  labelSelected: { backgroundColor: TASTE_OF_INDIA_COLORS.markerSelected },
  labelText: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: -0.2,
    color: TASTE_OF_INDIA_COLORS.black,
  },
  labelTextSelected: { color: TASTE_OF_INDIA_COLORS.white },
});
