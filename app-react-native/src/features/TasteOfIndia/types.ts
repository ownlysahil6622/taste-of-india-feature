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

/**
 * Part of the source image (in its own pixels) to show in the 152x168 dish
 * card. x/y/width: the region whose width fills the card. height: how much of
 * the source to show from y before cutting off (hides text baked into a
 * banner); fillColor fills the card below that.
 */
export type TasteOfIndiaCardImageCrop = {
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
};

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
  /** Pixel width of this state's dish banners (all are 510px tall). */
  bannerWidth: number;
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
