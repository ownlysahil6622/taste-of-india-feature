import React, { memo } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { TASTE_OF_INDIA_COLORS, TASTE_OF_INDIA_FONTS } from '../../constants';
import { resolveInsetStyle } from '../../layout';
import { TasteOfIndiaImage } from './TasteOfIndiaImage';
import { TasteOfIndiaText } from './TasteOfIndiaText';

const HEADER_TOP = 66;
const ORNAMENT_LEFT_KEY = 'f6c50.svg';
const ORNAMENT_RIGHT_KEY = '5e624.svg';

const Ornament = ({
  assetKey,
  mirrored,
}: {
  assetKey: string;
  mirrored?: boolean;
}) => (
  <View style={[styles.ornament, mirrored ? styles.mirrored : null]}>
    <View style={styles.ornamentImageBox}>
      <TasteOfIndiaImage assetKey={assetKey} style={styles.fill} />
    </View>
  </View>
);

type TasteOfIndiaMapHeaderProps = {
  onTitleCenterChange?: (centerY: number) => void;
};

export const TasteOfIndiaMapHeader = memo(function TasteOfIndiaMapHeader({
  onTitleCenterChange,
}: TasteOfIndiaMapHeaderProps) {
  const handleTitleRowLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    onTitleCenterChange?.(
      HEADER_TOP + nativeEvent.layout.y + nativeEvent.layout.height / 2,
    );
  };

  return (
    <>
      <View pointerEvents="none" style={styles.titleAnchor}>
        <View style={styles.titleBlock}>
          <View style={styles.titleRow} onLayout={handleTitleRowLayout}>
            <Ornament assetKey={ORNAMENT_LEFT_KEY} mirrored />
            <TasteOfIndiaText style={styles.title}>
              Taste of India
            </TasteOfIndiaText>
            <Ornament assetKey={ORNAMENT_RIGHT_KEY} />
          </View>
          <TasteOfIndiaText style={styles.subtitle}>
            Explore Cuisines by state
          </TasteOfIndiaText>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  fill: StyleSheet.absoluteFill,
  titleAnchor: {
    position: 'absolute',
    top: HEADER_TOP,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  titleBlock: {
    gap: 4,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ornament: { width: 29.365, height: 19 },
  mirrored: { transform: [{ scaleX: -1 }] },
  ornamentImageBox: resolveInsetStyle(
    ['-1.55%', '-1.01%', '0%', '-1%'],
    29.365,
    19,
  ),
  title: {
    fontFamily: TASTE_OF_INDIA_FONTS.display,
    fontSize: 24,
    letterSpacing: 0.48,
    textAlign: 'center',
    color: TASTE_OF_INDIA_COLORS.titleAccent,
  },
  subtitle: {
    fontFamily: TASTE_OF_INDIA_FONTS.regular,
    fontSize: 16,
    letterSpacing: 0.32,
    textAlign: 'center',
    color: TASTE_OF_INDIA_COLORS.textPrimary,
  },
});
