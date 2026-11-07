import { ResponsiveIconSizes } from '@assets/icons';
import Icon from '@components/global/Icon';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  TASTE_OF_INDIA_COLORS,
  TASTE_OF_INDIA_FONTS,
  TASTE_OF_INDIA_HEADER_BACK_SIZE,
  TASTE_OF_INDIA_HEADER_GAP,
  TASTE_OF_INDIA_HEADER_PADDING_BOTTOM,
  TASTE_OF_INDIA_HEADER_PADDING_X,
} from '../../constants';
import { useTasteOfIndiaMapHeaderLayout } from '../../hooks';
import { TasteOfIndiaText } from './TasteOfIndiaText';

type TasteOfIndiaMapHeaderProps = {
  onBack: () => void;
  backAccessibilityLabel: string;
};

// Fixed, solid white header drawn above the map: back button + title/subtitle.
export const TasteOfIndiaMapHeader = memo(function TasteOfIndiaMapHeader({
  onBack,
  backAccessibilityLabel,
}: TasteOfIndiaMapHeaderProps) {
  const { top, height } = useTasteOfIndiaMapHeaderLayout();

  return (
    <View style={[styles.header, { height, paddingTop: top }]}>
      <Pressable
        style={styles.back}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel={backAccessibilityLabel}
      >
        <Icon
          iconFamily="svg"
          name="arrow_back"
          size={ResponsiveIconSizes.md}
          color={TASTE_OF_INDIA_COLORS.black}
        />
      </Pressable>
      <View style={styles.text}>
        <TasteOfIndiaText style={styles.title} numberOfLines={1}>
          Taste of India
        </TasteOfIndiaText>
        <TasteOfIndiaText style={styles.subtitle} numberOfLines={1}>
          Explore cuisines by state
        </TasteOfIndiaText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: TASTE_OF_INDIA_HEADER_GAP,
    paddingHorizontal: TASTE_OF_INDIA_HEADER_PADDING_X,
    paddingBottom: TASTE_OF_INDIA_HEADER_PADDING_BOTTOM,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: TASTE_OF_INDIA_COLORS.headerDivider,
  },
  back: {
    width: TASTE_OF_INDIA_HEADER_BACK_SIZE,
    height: TASTE_OF_INDIA_HEADER_BACK_SIZE,
    borderRadius: TASTE_OF_INDIA_HEADER_BACK_SIZE / 2,
    borderWidth: 1,
    borderColor: TASTE_OF_INDIA_COLORS.border,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: TASTE_OF_INDIA_FONTS.bold,
    fontSize: 16,
    lineHeight: 22,
    color: TASTE_OF_INDIA_COLORS.headerTitle,
  },
  subtitle: {
    marginTop: 2,
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 14,
    lineHeight: 18,
    color: TASTE_OF_INDIA_COLORS.headerSubtitle,
  },
});
