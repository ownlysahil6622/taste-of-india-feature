import React, { memo } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  TASTE_OF_INDIA_BACK_BUTTON_SHADOW,
  TASTE_OF_INDIA_BANNER_ASPECT_RATIO,
  TASTE_OF_INDIA_BANNER_PLACEHOLDER_COLOR,
  TASTE_OF_INDIA_COLORS,
  TASTE_OF_INDIA_FONTS,
} from '../../constants';
import { useTasteOfIndiaBackButtonPosition } from '../../hooks';
import type { TasteOfIndiaDish, TasteOfIndiaState } from '../../types';
import { TasteOfIndiaBackButton } from './TasteOfIndiaBackButton';
import { TasteOfIndiaImage } from './TasteOfIndiaImage';
import { TasteOfIndiaRestaurantCard } from './TasteOfIndiaRestaurantCard';
import { TasteOfIndiaText } from './TasteOfIndiaText';

const buildDishDescription = (
  dish: TasteOfIndiaDish,
  state: TasteOfIndiaState,
) =>
  dish.name === 'Vada Pav'
    ? 'Maharashtra’s favorite snack - spiced potato fritters in soft pav, served with chutney and a spicy twist.'
    : `${dish.name} is a much-loved ${state.name} classic, celebrated for its rich local flavours and comforting traditional taste.`;

type TasteOfIndiaDishDetailProps = {
  dish: TasteOfIndiaDish;
  state: TasteOfIndiaState;
  onBack: () => void;
};

export const TasteOfIndiaDishDetail = memo(function TasteOfIndiaDishDetail({
  dish,
  state,
  onBack,
}: TasteOfIndiaDishDetailProps) {
  const { height } = useWindowDimensions();
  const backPosition = useTasteOfIndiaBackButtonPosition();

  return (
    <View style={styles.root} accessibilityLabel={`${dish.name} collection`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <TasteOfIndiaImage
            assetKey={dish.bannerKey ?? dish.imageKey}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={[styles.results, { minHeight: height }]}>
          {dish.bannerKey ? null : (
            <View style={styles.heading}>
              <TasteOfIndiaText style={styles.stateName}>
                {state.name}
              </TasteOfIndiaText>
              <TasteOfIndiaText style={styles.dishName}>
                {dish.name}
              </TasteOfIndiaText>
              <TasteOfIndiaText style={styles.description}>
                {buildDishDescription(dish, state)}
              </TasteOfIndiaText>
            </View>
          )}
          <TasteOfIndiaRestaurantCard />
          <TasteOfIndiaRestaurantCard />
        </View>
      </ScrollView>
      <TasteOfIndiaBackButton
        onPress={onBack}
        accessibilityLabel="Back to state dishes"
        style={[styles.back, backPosition]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    zIndex: 30,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
  },
  banner: {
    width: '100%',
    aspectRatio: TASTE_OF_INDIA_BANNER_ASPECT_RATIO,
    overflow: 'hidden',
    backgroundColor: TASTE_OF_INDIA_BANNER_PLACEHOLDER_COLOR,
  },
  // Look and size come from TasteOfIndiaBackButton; position from useTasteOfIndiaBackButtonPosition.
  back: {
    position: 'absolute',
    zIndex: 200,
    boxShadow: TASTE_OF_INDIA_BACK_BUTTON_SHADOW,
  },
  results: {
    padding: 16,
    gap: 16,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
  },
  heading: { alignItems: 'center' },
  stateName: {
    fontFamily: TASTE_OF_INDIA_FONTS.regular,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: TASTE_OF_INDIA_COLORS.detailAccent,
  },
  dishName: {
    fontFamily: TASTE_OF_INDIA_FONTS.bold,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    color: TASTE_OF_INDIA_COLORS.textPrimary,
  },
  description: {
    maxWidth: 356,
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: TASTE_OF_INDIA_COLORS.textPrimary,
  },
});
