import type {
  NovaComponentRow,
  NovaNormalizedResponse,
} from '@ownly/nova-core';

import { injectTasteOfIndiaIngressRow } from './injectTasteOfIndiaIngressRow';

const bodyRow = (id: string, type: string): NovaComponentRow =>
  ({
    key: `body:${id}:${type}:default:none`,
    id,
    sourceId: id,
    region: 'body',
    type,
    variant: 'default',
    recyclableType: `${type}:default:none`,
    sticky: 'none',
    rowKind: 'component',
  }) as NovaComponentRow;

const rowsByRegion = (
  body: NovaComponentRow[],
): NovaNormalizedResponse['rowsByRegion'] => ({
  header: [],
  body,
  footer: [],
  overlays: [],
});

describe('injectTasteOfIndiaIngressRow', () => {
  test('inserts the ingress after leading topSection and bannerCard rows', () => {
    const result = injectTasteOfIndiaIngressRow(
      rowsByRegion([
        bodyRow('0', 'topSection'),
        bodyRow('1', 'bannerCard'),
        bodyRow('2', 'foodItemRow'),
      ]),
    );

    expect(result.body.map(row => row.type)).toEqual([
      'topSection',
      'bannerCard',
      'tasteOfIndiaIngress',
      'foodItemRow',
    ]);
  });

  test('does not insert twice', () => {
    const once = injectTasteOfIndiaIngressRow(
      rowsByRegion([bodyRow('0', 'topSection'), bodyRow('2', 'foodItemRow')]),
    );

    expect(injectTasteOfIndiaIngressRow(once)).toBe(once);
  });

  test('leaves an empty body untouched', () => {
    const empty = rowsByRegion([]);

    expect(injectTasteOfIndiaIngressRow(empty)).toBe(empty);
  });
});
