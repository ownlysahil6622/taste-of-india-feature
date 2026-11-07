import type { NovaRegistryEntry } from '../../registry/types';
import { TASTE_OF_INDIA_INGRESS_ROW_HEIGHT } from './constants';
import { TASTE_OF_INDIA_INGRESS_TYPE } from './types';
import { TasteOfIndiaIngressComponent } from './variants/TasteOfIndiaIngressComponent';

export const tasteOfIndiaIngressEntries: NovaRegistryEntry[] = [
  {
    type: TASTE_OF_INDIA_INGRESS_TYPE,
    variant: 'default',
    recyclableType: `${TASTE_OF_INDIA_INGRESS_TYPE}:default:none`,
    Component: TasteOfIndiaIngressComponent,
    getEstimatedItemSize: () => TASTE_OF_INDIA_INGRESS_ROW_HEIGHT,
    getFixedItemSize: () => TASTE_OF_INDIA_INGRESS_ROW_HEIGHT,
  },
];
