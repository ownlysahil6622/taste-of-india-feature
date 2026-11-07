import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const TASTE_OF_INDIA_EASING = Easing.bezierFn(0.22, 1, 0.36, 1);

export const useSlideUpStyle = (durationMs: number, fallbackHeight: number) => {
  const height = useSharedValue(fallbackHeight);
  const progress = useSharedValue(0);
  const dragY = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: durationMs,
      easing: TASTE_OF_INDIA_EASING,
    });
  }, [durationMs, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (1 - progress.value) * height.value + dragY.value },
    ],
  }));

  return {
    animatedStyle,
    dragY,
    height,
    setHeight: (next: number) => (height.value = next),
  };
};
