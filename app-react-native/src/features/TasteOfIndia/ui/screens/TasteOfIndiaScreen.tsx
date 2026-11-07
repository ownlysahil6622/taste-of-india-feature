import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { BlurView } from '@sbaiahmed1/react-native-blur';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';

import { TASTE_OF_INDIA_EASING } from '../../animation';
import {
  TASTE_OF_INDIA_BACK_BUTTON_LEFT,
  TASTE_OF_INDIA_BACK_BUTTON_SIZE,
  TASTE_OF_INDIA_COLORS,
  TASTE_OF_INDIA_SCENE_PAD_X,
  TASTE_OF_INDIA_SCENE_PAD_Y,
  TASTE_OF_INDIA_HEADER_BLUR_AMOUNT,
  TASTE_OF_INDIA_HEADER_BLUR_HEIGHT,
  TASTE_OF_INDIA_HEADER_GLASS_TINT,
  TASTE_OF_INDIA_MAP_CENTER_OFFSET,
  TASTE_OF_INDIA_MAP_SIZE,
  TASTE_OF_INDIA_MAP_TOP,
  TASTE_OF_INDIA_SCENE_DURATION_MS,
} from '../../constants';
import { useTasteOfIndiaBackButtonTop } from '../../hooks';
import { computeMapFocus, computeMapPanBounds } from '../../layout';
import type { TasteOfIndiaState } from '../../types';
import { useTasteOfIndiaViewModel } from '../../vm/useTasteOfIndiaViewModel';
import { TasteOfIndiaDishDetail } from '../components/TasteOfIndiaDishDetail';
import { TasteOfIndiaDiscoveryTip } from '../components/TasteOfIndiaDiscoveryTip';
import { TasteOfIndiaHitAreas } from '../components/TasteOfIndiaHitAreas';
import { TasteOfIndiaImage } from '../components/TasteOfIndiaImage';
import { TasteOfIndiaMapHeader } from '../components/TasteOfIndiaMapHeader';
import { TasteOfIndiaMapLayers } from '../components/TasteOfIndiaMapLayers';
import { TasteOfIndiaStateMarker } from '../components/TasteOfIndiaStateMarker';
import { TasteOfIndiaStateSheet } from '../components/TasteOfIndiaStateSheet';

const BACK_ICON_KEY = '916b0.svg';

export const TasteOfIndiaScreen = () => {
  const { state, actions } = useTasteOfIndiaViewModel();
  const [titleCenter, setTitleCenter] = useState<number | null>(null);
  const fallbackBackTop = useTasteOfIndiaBackButtonTop();
  const backTop =
    titleCenter === null
      ? fallbackBackTop
      : titleCenter - TASTE_OF_INDIA_BACK_BUTTON_SIZE / 2;
  const insets = useSafeAreaInsets();
  const window = useWindowDimensions();
  const [size, setSize] = useState({
    width: window.width,
    height: window.height,
  });
  const [obstruction, setObstruction] = useState(0);
  const sceneScale = useSharedValue(1);
  const sceneTranslateX = useSharedValue(0);
  const sceneTranslateY = useSharedValue(0);
  const blurOpacity = useSharedValue(0);
  const panActiveRef = useRef(false);
  const panEndedAtRef = useRef(0);
  const markPan = useCallback((active: boolean) => {
    panActiveRef.current = active;
    if (!active) {
      panEndedAtRef.current = Date.now();
    }
  }, []);
  const handleSelectState = useCallback(
    (next: TasteOfIndiaState) => {
      if (panActiveRef.current || Date.now() - panEndedAtRef.current < 200) {
        return;
      }
      actions.selectState(next);
    },
    [actions],
  );
  const markerYs = state.states.map(item => item.markerAnchor.y);
  const markerTop = Math.min(...markerYs);
  const markerBottom = Math.max(...markerYs);
  const handleBackdropPress = useCallback(() => {
    if (panActiveRef.current || Date.now() - panEndedAtRef.current < 200) {
      return;
    }
    actions.closeState();
  }, [actions]);
  const panStartY = useSharedValue(0);
  const panBounds = useSharedValue({ minX: 0, maxX: 0, minY: 0, maxY: 0 });
  const { selectedState, selectedDish } = state;

  useEffect(() => {
    const target = computeMapFocus({
      width: size.width,
      height: size.height,
      obstruction,
      anchor: selectedState?.markerAnchor ?? null,
    });
    const timing = {
      duration: TASTE_OF_INDIA_SCENE_DURATION_MS,
      easing: TASTE_OF_INDIA_EASING,
    };
    sceneScale.value = withTiming(target.scale, timing);
    sceneTranslateX.value = withTiming(target.translateX, timing);
    sceneTranslateY.value = withTiming(target.translateY, timing);
    blurOpacity.value = withTiming(selectedState ? 1 : 0, timing);
    panBounds.value = computeMapPanBounds({
      width: size.width,
      height: size.height,
      obstruction,
      scale: target.scale,
      restX: target.translateX,
      restY: target.translateY,
      locked: !selectedState,
      markerTop,
      markerBottom,
    });
  }, [
    selectedState,
    obstruction,
    size.width,
    size.height,
    sceneScale,
    sceneTranslateX,
    sceneTranslateY,
    blurOpacity,
    panBounds,
    markerTop,
    markerBottom,
  ]);

  const panGesture = Gesture.Pan()
    // Drag only while a state is selected; taps on markers/states are unaffected.
    .enabled(selectedState != null)
    .minDistance(8)
    .onStart(() => {
      'worklet';
      scheduleOnRN(markPan, true);
      // Vertical-only drag: leave sceneTranslateX (and its focus animation) alone.
      cancelAnimation(sceneTranslateY);
      panStartY.value = sceneTranslateY.value;
    })
    .onUpdate(event => {
      'worklet';
      const bounds = panBounds.value;
      sceneTranslateY.value = Math.min(
        bounds.maxY,
        Math.max(bounds.minY, panStartY.value + event.translationY),
      );
    })
    .onFinalize(() => {
      'worklet';
      scheduleOnRN(markPan, false);
    })
    .onEnd(event => {
      'worklet';
      const bounds = panBounds.value;
      sceneTranslateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [bounds.minY, bounds.maxY],
      });
    });

  const sceneStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: sceneTranslateX.value },
      { translateY: sceneTranslateY.value },
      { scale: sceneScale.value },
    ],
  }));

  const blurStyle = useAnimatedStyle(() => ({ opacity: blurOpacity.value }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize(current =>
      current.width === width && current.height === height
        ? current
        : { width, height },
    );
  };

  return (
    <View style={styles.shell} onLayout={handleLayout}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.scene, sceneStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleBackdropPress}
            disabled={!selectedState}
            accessibilityRole="button"
            accessibilityLabel="Close state details"
          />
          <View
            pointerEvents="box-none"
            style={[
              styles.sceneContent,
              { width: size.width, height: size.height },
            ]}
          >
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
              <View
                style={[
                  styles.map,
                  {
                    left:
                      size.width / 2 +
                      TASTE_OF_INDIA_MAP_CENTER_OFFSET -
                      TASTE_OF_INDIA_MAP_SIZE / 2,
                  },
                ]}
              >
                <TasteOfIndiaMapLayers
                  layers={state.mapLayers}
                  width={TASTE_OF_INDIA_MAP_SIZE}
                  height={TASTE_OF_INDIA_MAP_SIZE}
                  selectedLayerKeys={state.selectedLayerKeys}
                  selectedState={selectedState?.name}
                />
                {state.markers.map(marker => (
                  <TasteOfIndiaStateMarker
                    key={marker.state}
                    marker={marker}
                    isSelected={selectedState?.name === marker.state}
                    pulse={state.markerPulse}
                    containerWidth={TASTE_OF_INDIA_MAP_SIZE}
                    containerHeight={TASTE_OF_INDIA_MAP_SIZE}
                  />
                ))}
              </View>
            </View>
            <TasteOfIndiaHitAreas
              states={state.states}
              containerWidth={size.width}
              onSelectState={handleSelectState}
            />
          </View>
        </Animated.View>
      </GestureDetector>
      <Animated.View
        pointerEvents="none"
        style={[styles.headerGlass, blurStyle]}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={TASTE_OF_INDIA_HEADER_BLUR_AMOUNT}
          reducedTransparencyFallbackColor={TASTE_OF_INDIA_COLORS.shell}
        />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={TASTE_OF_INDIA_HEADER_GLASS_TINT}
        />
      </Animated.View>
      <TasteOfIndiaMapHeader onTitleCenterChange={setTitleCenter} />
      <Pressable
        style={[styles.backAction, { top: backTop }]}
        onPress={actions.handleBackAction}
        accessibilityRole="button"
        accessibilityLabel={selectedState ? 'Close state details' : 'Go back'}
      >
        <View style={styles.backIcon}>
          <TasteOfIndiaImage
            assetKey={BACK_ICON_KEY}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </Pressable>
      {selectedState ? null : (
        <TasteOfIndiaDiscoveryTip onHeightChange={setObstruction} />
      )}
      {selectedState ? (
        <TasteOfIndiaStateSheet
          state={selectedState}
          onHeightChange={setObstruction}
          onClose={actions.closeState}
          onSelectDish={actions.selectDish}
        />
      ) : null}
      {selectedState && selectedDish ? (
        <TasteOfIndiaDishDetail
          dish={selectedDish}
          state={selectedState}
          onBack={actions.closeDish}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: TASTE_OF_INDIA_COLORS.shell,
  },
  scene: {
    position: 'absolute',
    top: -TASTE_OF_INDIA_SCENE_PAD_Y,
    right: -TASTE_OF_INDIA_SCENE_PAD_X,
    bottom: -TASTE_OF_INDIA_SCENE_PAD_Y,
    left: -TASTE_OF_INDIA_SCENE_PAD_X,
    transformOrigin: `${TASTE_OF_INDIA_SCENE_PAD_X}px ${TASTE_OF_INDIA_SCENE_PAD_Y}px`,
  },
  sceneContent: {
    position: 'absolute',
    top: TASTE_OF_INDIA_SCENE_PAD_Y,
    left: TASTE_OF_INDIA_SCENE_PAD_X,
  },
  headerGlass: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: TASTE_OF_INDIA_HEADER_BLUR_HEIGHT,
    overflow: 'hidden',
  },
  map: {
    position: 'absolute',
    top: TASTE_OF_INDIA_MAP_TOP,
    width: TASTE_OF_INDIA_MAP_SIZE,
    height: TASTE_OF_INDIA_MAP_SIZE,
  },
  backAction: {
    position: 'absolute',
    left: TASTE_OF_INDIA_BACK_BUTTON_LEFT,
    zIndex: 20,
    width: TASTE_OF_INDIA_BACK_BUTTON_SIZE,
    height: TASTE_OF_INDIA_BACK_BUTTON_SIZE,
    borderRadius: TASTE_OF_INDIA_BACK_BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TASTE_OF_INDIA_COLORS.detailBackScrim,
  },
  backIcon: { width: 24, height: 24 },
});
