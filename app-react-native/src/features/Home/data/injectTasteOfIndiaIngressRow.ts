import type {
  NovaComponentRow,
  NovaNormalizedResponse,
} from '@ownly/nova-core';

import { TASTE_OF_INDIA_INGRESS_TYPE } from '../../nova/components/TasteOfIndiaIngress/types';

const TASTE_OF_INDIA_INGRESS_ROW_ID = 'client_taste_of_india_ingress';
const LEADING_ROW_TYPES = new Set(['topSection', 'bannerCard']);

const buildTasteOfIndiaIngressRow = (): NovaComponentRow =>
  ({
    key: `body:${TASTE_OF_INDIA_INGRESS_ROW_ID}:${TASTE_OF_INDIA_INGRESS_TYPE}:default:none`,
    id: TASTE_OF_INDIA_INGRESS_ROW_ID,
    sourceId: TASTE_OF_INDIA_INGRESS_ROW_ID,
    region: 'body',
    type: TASTE_OF_INDIA_INGRESS_TYPE,
    variant: 'default',
    recyclableType: `${TASTE_OF_INDIA_INGRESS_TYPE}:default:none`,
    rowKind: 'component',
    sticky: 'none',
  }) as NovaComponentRow;

export function injectTasteOfIndiaIngressRow(
  rowsByRegion: NovaNormalizedResponse['rowsByRegion'],
): NovaNormalizedResponse['rowsByRegion'] {
  const body = rowsByRegion.body;
  if (
    body.length === 0 ||
    body.some(row => row.sourceId === TASTE_OF_INDIA_INGRESS_ROW_ID)
  ) {
    return rowsByRegion;
  }

  let insertAt = 0;
  while (insertAt < body.length && LEADING_ROW_TYPES.has(body[insertAt].type)) {
    insertAt += 1;
  }

  return {
    ...rowsByRegion,
    body: [
      ...body.slice(0, insertAt),
      buildTasteOfIndiaIngressRow(),
      ...body.slice(insertAt),
    ],
  };
}
