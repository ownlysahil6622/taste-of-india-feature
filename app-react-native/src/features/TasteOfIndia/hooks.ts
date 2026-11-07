import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  TASTE_OF_INDIA_BACK_BUTTON_MIN_TOP,
  TASTE_OF_INDIA_COLLECTION_BACK_TOP_GAP,
} from './constants';

export const useTasteOfIndiaBackButtonTop = () => {
  const insets = useSafeAreaInsets();
  return Math.max(TASTE_OF_INDIA_BACK_BUTTON_MIN_TOP, insets.top);
};

export const useTasteOfIndiaCollectionBackTop = () => {
  const insets = useSafeAreaInsets();
  return insets.top + TASTE_OF_INDIA_COLLECTION_BACK_TOP_GAP;
};
