import {
  useNavigation,
  type NavigationProp,
  type ParamListBase,
} from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler } from 'react-native';

import { tasteOfIndiaMapLayers } from '../data/tasteOfIndiaMapLayers';
import { tasteOfIndiaMarkers } from '../data/tasteOfIndiaMarkers';
import { tasteOfIndiaStates } from '../data/tasteOfIndiaStates';
import type { TasteOfIndiaDish, TasteOfIndiaState } from '../types';

export const useTasteOfIndiaViewModel = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedState, setSelectedState] = useState<TasteOfIndiaState | null>(
    null,
  );
  const [selectedDish, setSelectedDish] = useState<TasteOfIndiaDish | null>(
    null,
  );
  const [markerPulse, setMarkerPulse] = useState(0);

  const selectState = useCallback((state: TasteOfIndiaState) => {
    setSelectedState(state);
    setMarkerPulse(pulse => pulse + 1);
  }, []);

  const closeState = useCallback(() => setSelectedState(null), []);
  const closeDish = useCallback(() => setSelectedDish(null), []);

  const handleBackAction = useCallback(() => {
    if (selectedState) {
      setSelectedState(null);
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('Home');
  }, [navigation, selectedState]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (selectedDish) {
          setSelectedDish(null);
          return true;
        }
        if (selectedState) {
          setSelectedState(null);
          return true;
        }
        return false;
      },
    );
    return () => subscription.remove();
  }, [selectedDish, selectedState]);

  const selectedLayerKeys = useMemo(
    () =>
      Object.fromEntries(
        tasteOfIndiaStates.map(state => [state.name, state.selectedLayerKey]),
      ),
    [],
  );

  return {
    state: {
      states: tasteOfIndiaStates,
      markers: tasteOfIndiaMarkers,
      mapLayers: tasteOfIndiaMapLayers,
      selectedLayerKeys,
      selectedState,
      selectedDish,
      markerPulse,
    },
    actions: {
      selectState,
      closeState,
      selectDish: setSelectedDish,
      closeDish,
      handleBackAction,
    },
  };
};
