import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  TASTE_OF_INDIA_HEADER_BACK_SIZE,
  TASTE_OF_INDIA_HEADER_BORDER_WIDTH,
  TASTE_OF_INDIA_HEADER_CONTENT_HEIGHT,
  TASTE_OF_INDIA_HEADER_MIN_TOP,
  TASTE_OF_INDIA_HEADER_PADDING_BOTTOM,
  TASTE_OF_INDIA_HEADER_PADDING_X,
} from './constants';

// Top padding and total height of the fixed map header.
export const useTasteOfIndiaMapHeaderLayout = () => {
  const insets = useSafeAreaInsets();
  const top = Math.max(TASTE_OF_INDIA_HEADER_MIN_TOP, insets.top);
  return { top, height: top + TASTE_OF_INDIA_HEADER_CONTENT_HEIGHT };
};

// Where the map header's back button sits on screen: centred in the header's content box (between
// the top padding and the bottom padding + border), PADDING_X from the left. The dish detail screen
// puts its back button here too, so it doesn't move when switching screens.
export const useTasteOfIndiaBackButtonPosition = () => {
  const { top } = useTasteOfIndiaMapHeaderLayout();
  const contentHeight =
    TASTE_OF_INDIA_HEADER_CONTENT_HEIGHT -
    TASTE_OF_INDIA_HEADER_PADDING_BOTTOM -
    TASTE_OF_INDIA_HEADER_BORDER_WIDTH;
  return {
    top: top + (contentHeight - TASTE_OF_INDIA_HEADER_BACK_SIZE) / 2,
    left: TASTE_OF_INDIA_HEADER_PADDING_X,
  };
};
