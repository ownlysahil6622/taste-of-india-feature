import { ResponsiveIconSizes } from '@assets/icons';
import Icon from '@components/global/Icon';
import React, { memo } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { TASTE_OF_INDIA_COLORS, TASTE_OF_INDIA_HEADER_BACK_SIZE } from '../../constants';

type TasteOfIndiaBackButtonProps = {
  onPress: () => void;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

// The one back button used by the map header and the dish detail screen, so the two can't drift apart.
export const TasteOfIndiaBackButton = memo(function TasteOfIndiaBackButton({
  onPress,
  accessibilityLabel,
  style,
}: TasteOfIndiaBackButtonProps) {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Icon
        iconFamily="svg"
        name="arrow_back"
        size={ResponsiveIconSizes.md}
        color={TASTE_OF_INDIA_COLORS.black}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    width: TASTE_OF_INDIA_HEADER_BACK_SIZE,
    height: TASTE_OF_INDIA_HEADER_BACK_SIZE,
    borderRadius: TASTE_OF_INDIA_HEADER_BACK_SIZE / 2,
    borderWidth: 1,
    borderColor: TASTE_OF_INDIA_COLORS.border,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
