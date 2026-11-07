import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  TASTE_OF_INDIA_COLLECTION_BACK_TOP_GAP,
  TASTE_OF_INDIA_HEADER_CONTENT_HEIGHT,
  TASTE_OF_INDIA_HEADER_MIN_TOP,
} from './constants';

// Top padding and total height of the fixed map header.
export const useTasteOfIndiaMapHeaderLayout = () => {
  const insets = useSafeAreaInsets();
  const top = Math.max(TASTE_OF_INDIA_HEADER_MIN_TOP, insets.top);
  return { top, height: top + TASTE_OF_INDIA_HEADER_CONTENT_HEIGHT };
};

export const useTasteOfIndiaCollectionBackTop = () => {
  const insets = useSafeAreaInsets();
  return insets.top + TASTE_OF_INDIA_COLLECTION_BACK_TOP_GAP;
};
