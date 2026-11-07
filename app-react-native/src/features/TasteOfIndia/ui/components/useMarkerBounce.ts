import { useEffect } from 'react';
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { TASTE_OF_INDIA_EASING } from '../../animation';

const CLUSTER_VALUES_Y = [-8, 2, -3, 0];
const CLUSTER_VALUES_SCALE = [1.08, 0.98, 1.03, 1];
const CLUSTER_DURATIONS = [223.2, 148.8, 124, 124];

const SIDE_DURATIONS = [235.6, 186, 198.4];
const LEFT_VALUES_X = [-5, 1, 0];
const LEFT_VALUES_ROTATE = [-11, 3, 0];
const RIGHT_VALUES_X = [5, -1, 0];
const RIGHT_VALUES_ROTATE = [13, -3, 0];

const buildSequence = (values: number[], durations: number[]) =>
  withSequence(
    ...values.map((value, index) =>
      withTiming(value, {
        duration: durations[index],
        easing: TASTE_OF_INDIA_EASING,
      }),
    ),
  );

export const useMarkerBounce = (isActive: boolean, pulse: number) => {
  const clusterY = useSharedValue(0);
  const clusterScale = useSharedValue(1);
  const leftX = useSharedValue(0);
  const leftRotate = useSharedValue(0);
  const rightX = useSharedValue(0);
  const rightRotate = useSharedValue(0);

  useEffect(() => {
    [clusterY, clusterScale, leftX, leftRotate, rightX, rightRotate].forEach(
      cancelAnimation,
    );
    clusterY.value = 0;
    clusterScale.value = 1;
    leftX.value = 0;
    leftRotate.value = 0;
    rightX.value = 0;
    rightRotate.value = 0;
    if (!isActive) return;

    clusterY.value = buildSequence(CLUSTER_VALUES_Y, CLUSTER_DURATIONS);
    clusterScale.value = buildSequence(CLUSTER_VALUES_SCALE, CLUSTER_DURATIONS);
    leftX.value = buildSequence(LEFT_VALUES_X, SIDE_DURATIONS);
    leftRotate.value = buildSequence(LEFT_VALUES_ROTATE, SIDE_DURATIONS);
    rightX.value = buildSequence(RIGHT_VALUES_X, SIDE_DURATIONS);
    rightRotate.value = buildSequence(RIGHT_VALUES_ROTATE, SIDE_DURATIONS);
  }, [
    isActive,
    pulse,
    clusterY,
    clusterScale,
    leftX,
    leftRotate,
    rightX,
    rightRotate,
  ]);

  const clusterStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: clusterY.value }, { scale: clusterScale.value }],
  }));
  const leftStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: leftX.value },
      { rotate: `${leftRotate.value}deg` },
    ],
  }));
  const rightStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: rightX.value },
      { rotate: `${rightRotate.value}deg` },
    ],
  }));

  return { clusterStyle, leftStyle, rightStyle };
};
