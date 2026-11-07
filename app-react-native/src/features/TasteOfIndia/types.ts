import type { DimensionValue } from 'react-native';

export type TasteOfIndiaPercent = `${number}%`;

export type TasteOfIndiaInset = readonly [
  TasteOfIndiaPercent,
  TasteOfIndiaPercent,
  TasteOfIndiaPercent,
  TasteOfIndiaPercent,
];

export type TasteOfIndiaMapLayer =
  | {
      kind: 'box';
      inset?: TasteOfIndiaInset;
      children: readonly TasteOfIndiaMapLayer[];
    }
  | { kind: 'image'; assetKey: string }
  | { kind: 'state'; state: string; dormantAssetKey: string };

export type TasteOfIndiaDish = {
  name: string;
  imageKey: string;
  bannerKey?: string;
  description: string;
};

export type TasteOfIndiaIllustrationCrop = {
  top: TasteOfIndiaPercent;
  left: TasteOfIndiaPercent;
  width: TasteOfIndiaPercent;
  height: TasteOfIndiaPercent;
};

export type TasteOfIndiaStateTarget = {
  left: DimensionValue;
  top: DimensionValue;
  width: DimensionValue;
  height: DimensionValue;
};

export type TasteOfIndiaState = {
  name: string;
  illustrationKey: string;
  selectedLayerKey: string;
  illustrationCrop?: TasteOfIndiaIllustrationCrop;
  hitboxPath: string;
  target: TasteOfIndiaStateTarget;
  markerAnchor: { x: number; y: number };
  dishes: readonly TasteOfIndiaDish[];
};

export type TasteOfIndiaMarkerPosition =
  | { kind: 'inset'; inset: TasteOfIndiaInset }
  | { kind: 'centerOffset'; left: number; top: number };

export type TasteOfIndiaMarker = {
  state: string;
  label: string;
  position: TasteOfIndiaMarkerPosition;
  labelFirst: boolean;
  iconKey: string;
  iconOffsetX: number;
  count: number;
};

export type TasteOfIndiaRestaurantItem = {
  name: string;
  imageKey: string;
  price: string;
  badge?: string;
};
