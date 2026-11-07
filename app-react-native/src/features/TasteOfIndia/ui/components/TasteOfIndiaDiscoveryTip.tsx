import React, { memo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSlideUpStyle } from '../../animation';
import {
  TASTE_OF_INDIA_COLORS,
  TASTE_OF_INDIA_DISCOVERY_TIP_DURATION_MS,
  TASTE_OF_INDIA_FONTS,
  TASTE_OF_INDIA_SHEET_SHADOW,
} from '../../constants';
import { TasteOfIndiaImage } from './TasteOfIndiaImage';
import { TasteOfIndiaText } from './TasteOfIndiaText';

const HAND_TAP_KEY = '93d0c.gif';

type TasteOfIndiaDiscoveryTipProps = {
  onHeightChange?: (height: number) => void;
};

export const TasteOfIndiaDiscoveryTip = memo(function TasteOfIndiaDiscoveryTip({
  onHeightChange,
}: TasteOfIndiaDiscoveryTipProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { animatedStyle, setHeight } = useSlideUpStyle(
    TASTE_OF_INDIA_DISCOVERY_TIP_DURATION_MS,
    height,
  );

  return (
    <Animated.View
      style={[
        styles.root,
        { paddingBottom: Math.max(14, insets.bottom) },
        animatedStyle,
      ]}
      onLayout={event => {
        setHeight(event.nativeEvent.layout.height);
        onHeightChange?.(event.nativeEvent.layout.height);
      }}
    >
      <View style={styles.handle} />
      <View style={styles.row}>
        <View style={styles.icon}>
          <TasteOfIndiaImage
            assetKey={HAND_TAP_KEY}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
        </View>
        <TasteOfIndiaText
          style={[styles.text, { width: Math.min(278, width - 84) }]}
        >
          Tap on state to discover regional flavours
        </TasteOfIndiaText>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    minHeight: 78,
    paddingTop: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: TASTE_OF_INDIA_COLORS.border,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: TASTE_OF_INDIA_COLORS.sheetBackground,
    boxShadow: TASTE_OF_INDIA_SHEET_SHADOW,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 5,
    borderRadius: 999,
    backgroundColor: TASTE_OF_INDIA_COLORS.handle,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { width: 50, height: 50, opacity: 0.9 },
  text: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 15,
    textAlign: 'center',
    color: TASTE_OF_INDIA_COLORS.textSecondary,
  },
});
