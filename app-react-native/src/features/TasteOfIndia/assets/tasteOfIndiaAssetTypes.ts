import type { Source } from '@d11/react-native-fast-image';
import type { ComponentType } from 'react';
import type { ImageRequireSource } from 'react-native';
import type { SvgProps } from 'react-native-svg';

export type TasteOfIndiaRasterSource = ImageRequireSource | Source;

export type TasteOfIndiaLocalAsset =
  | { kind: 'raster'; source: ImageRequireSource }
  | { kind: 'svg'; Component: ComponentType<SvgProps> };

export type TasteOfIndiaResolvedAsset =
  | { kind: 'raster'; source: TasteOfIndiaRasterSource }
  | { kind: 'svg'; Component: ComponentType<SvgProps> }
  | { kind: 'svgUri'; uri: string };
