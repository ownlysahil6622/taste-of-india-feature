import React, { memo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSlideUpStyle } from '../../animation';
import {
  TASTE_OF_INDIA_BOTTOM_SHEET_DURATION_MS,
  TASTE_OF_INDIA_COLORS,
  TASTE_OF_INDIA_FONTS,
  TASTE_OF_INDIA_SHEET_DISMISS_DISTANCE,
  TASTE_OF_INDIA_SHEET_DISMISS_DURATION_MS,
  TASTE_OF_INDIA_SHEET_DISMISS_VELOCITY,
  TASTE_OF_INDIA_SHEET_MAX_HEIGHT_RATIO,
  TASTE_OF_INDIA_SHEET_SHADOW,
} from '../../constants';
import type { TasteOfIndiaDish, TasteOfIndiaState } from '../../types';
import {
  TASTE_OF_INDIA_DISH_CARD_GAP,
  TASTE_OF_INDIA_DISH_CARD_WIDTH,
  TasteOfIndiaDishCard,
} from './TasteOfIndiaDishCard';
import { TasteOfIndiaStateIllustration } from './TasteOfIndiaStateIllustration';
import { TasteOfIndiaText } from './TasteOfIndiaText';

const CARD_SNAP_INTERVAL =
  TASTE_OF_INDIA_DISH_CARD_WIDTH + TASTE_OF_INDIA_DISH_CARD_GAP;

type TasteOfIndiaStateSheetProps = {
  state: TasteOfIndiaState;
  onHeightChange?: (height: number) => void;
  onClose: () => void;
  onSelectDish: (dish: TasteOfIndiaDish) => void;
};

export const TasteOfIndiaStateSheet = memo(function TasteOfIndiaStateSheet({
  state,
  onHeightChange,
  onClose,
  onSelectDish,
}: TasteOfIndiaStateSheetProps) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {
    animatedStyle,
    dragY,
    height: sheetHeight,
    setHeight,
  } = useSlideUpStyle(TASTE_OF_INDIA_BOTTOM_SHEET_DURATION_MS, height);

  const dismissGesture = Gesture.Pan()
    .activeOffsetY([12, 9999])
    .failOffsetX([-16, 16])
    .onUpdate(event => {
      'worklet';
      dragY.value = Math.max(0, event.translationY);
    })
    .onEnd(event => {
      'worklet';
      const shouldClose =
        event.translationY > TASTE_OF_INDIA_SHEET_DISMISS_DISTANCE ||
        event.velocityY > TASTE_OF_INDIA_SHEET_DISMISS_VELOCITY;
      if (shouldClose) {
        dragY.value = withTiming(
          sheetHeight.value,
          { duration: TASTE_OF_INDIA_SHEET_DISMISS_DURATION_MS },
          finished => {
            if (finished) {
              scheduleOnRN(onClose);
            }
          },
        );
      } else {
        dragY.value = withTiming(0, {
          duration: TASTE_OF_INDIA_SHEET_DISMISS_DURATION_MS,
        });
      }
    });

  return (
    <GestureDetector gesture={dismissGesture}>
      <Animated.View
        accessibilityLabel={`${state.name} popular regional dishes`}
        style={[
          styles.root,
          {
            maxHeight: height * TASTE_OF_INDIA_SHEET_MAX_HEIGHT_RATIO,
            paddingBottom: Math.max(36, insets.bottom),
          },
          animatedStyle,
        ]}
        onLayout={event => {
          setHeight(event.nativeEvent.layout.height);
          onHeightChange?.(event.nativeEvent.layout.height);
        }}
      >
        <Pressable
          style={styles.handle}
          hitSlop={14}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close state details"
        />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.body}
          contentContainerStyle={styles.content}
        >
          <View style={styles.header}>
            <TasteOfIndiaStateIllustration state={state} />
            <View>
              <TasteOfIndiaText style={styles.title}>
                {state.name}
              </TasteOfIndiaText>
              <TasteOfIndiaText style={styles.subtitle}>
                Popular regional dishes
              </TasteOfIndiaText>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_SNAP_INTERVAL}
            snapToAlignment="start"
            decelerationRate="fast"
            style={styles.carousel}
            contentContainerStyle={styles.carouselContent}
          >
            {state.dishes.map(dish => (
              <TasteOfIndiaDishCard
                key={dish.name}
                dish={dish}
                onPress={onSelectDish}
              />
            ))}
          </ScrollView>
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    minHeight: 260,
    gap: 6,
    paddingTop: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: TASTE_OF_INDIA_COLORS.border,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: TASTE_OF_INDIA_COLORS.sheetBackground,
    boxShadow: TASTE_OF_INDIA_SHEET_SHADOW,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 999,
    backgroundColor: TASTE_OF_INDIA_COLORS.handle,
  },
  body: {
    alignSelf: 'stretch',
    flexGrow: 0,
    flexShrink: 1,
    marginHorizontal: -12,
  },
  content: { gap: 16, paddingHorizontal: 12, alignItems: 'flex-start' },
  header: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: TASTE_OF_INDIA_FONTS.semiBold,
    fontSize: 24,
    color: TASTE_OF_INDIA_COLORS.textPrimary,
  },
  subtitle: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 12,
    letterSpacing: -0.12,
    color: TASTE_OF_INDIA_COLORS.textMuted,
  },
  carousel: { alignSelf: 'stretch', flexGrow: 0, marginHorizontal: -12 },
  carouselContent: {
    gap: TASTE_OF_INDIA_DISH_CARD_GAP,
    paddingHorizontal: 12,
  },
});
