import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  TASTE_OF_INDIA_COLORS,
  TASTE_OF_INDIA_DISH_OVERLAY_COLORS,
  TASTE_OF_INDIA_DISH_OVERLAY_LOCATIONS,
  TASTE_OF_INDIA_FONTS,
} from '../../constants';
import type { TasteOfIndiaDish } from '../../types';
import { TasteOfIndiaImage } from './TasteOfIndiaImage';
import { TasteOfIndiaText } from './TasteOfIndiaText';

export const TASTE_OF_INDIA_DISH_CARD_WIDTH = 152;
export const TASTE_OF_INDIA_DISH_CARD_GAP = 8;

type TasteOfIndiaDishCardProps = {
  dish: TasteOfIndiaDish;
  onPress: (dish: TasteOfIndiaDish) => void;
};

export const TasteOfIndiaDishCard = memo(function TasteOfIndiaDishCard({
  dish,
  onPress,
}: TasteOfIndiaDishCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(dish)}
      accessibilityRole="button"
      accessibilityLabel={dish.name}
    >
      <TasteOfIndiaImage
        assetKey={dish.imageKey}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.copy}>
        <LinearGradient
          pointerEvents="none"
          style={styles.overlay}
          colors={TASTE_OF_INDIA_DISH_OVERLAY_COLORS}
          locations={TASTE_OF_INDIA_DISH_OVERLAY_LOCATIONS}
        />
        <TasteOfIndiaText numberOfLines={1} style={styles.name}>
          {dish.name}
        </TasteOfIndiaText>
        <TasteOfIndiaText numberOfLines={2} style={styles.description}>
          {dish.description}
        </TasteOfIndiaText>
        <View style={styles.explore}>
          <TasteOfIndiaText style={styles.exploreText}>
            Explore
          </TasteOfIndiaText>
          <TasteOfIndiaText style={styles.exploreArrow}>→</TasteOfIndiaText>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    width: TASTE_OF_INDIA_DISH_CARD_WIDTH,
    height: 168,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
  },
  overlay: { position: 'absolute', top: 0, right: -8, bottom: -11, left: -8 },
  copy: {
    position: 'absolute',
    right: 8,
    bottom: 11,
    left: 8,
    gap: 4,
    alignItems: 'flex-start',
  },
  name: {
    maxWidth: '100%',
    fontFamily: TASTE_OF_INDIA_FONTS.semiBold,
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.32,
    color: TASTE_OF_INDIA_COLORS.white,
  },
  description: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 12,
    lineHeight: 13.44,
    letterSpacing: -0.24,
    color: TASTE_OF_INDIA_COLORS.dishCopyDescription,
  },
  explore: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: TASTE_OF_INDIA_COLORS.brand,
  },
  exploreText: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 12,
    lineHeight: 14,
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: TASTE_OF_INDIA_COLORS.white,
  },
  exploreArrow: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 12,
    lineHeight: 14,
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: TASTE_OF_INDIA_COLORS.white,
  },
});
