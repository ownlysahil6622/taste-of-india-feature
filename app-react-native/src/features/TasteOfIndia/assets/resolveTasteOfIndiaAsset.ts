import { TASTE_OF_INDIA_ASSET_CDN_BASE_URL } from './tasteOfIndiaAssetConfig';
import type { TasteOfIndiaResolvedAsset } from './tasteOfIndiaAssetTypes';
import { tasteOfIndiaLocalAssets } from './tasteOfIndiaLocalAssets';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const getTasteOfIndiaAssetUri = (assetKey: string): string | null =>
  TASTE_OF_INDIA_ASSET_CDN_BASE_URL
    ? `${trimTrailingSlash(TASTE_OF_INDIA_ASSET_CDN_BASE_URL)}/${assetKey}`
    : null;

export const resolveTasteOfIndiaAsset = (
  assetKey: string,
): TasteOfIndiaResolvedAsset | null => {
  const uri = getTasteOfIndiaAssetUri(assetKey);
  if (uri) {
    return assetKey.endsWith('.svg')
      ? { kind: 'svgUri', uri }
      : { kind: 'raster', source: { uri } };
  }
  return tasteOfIndiaLocalAssets[assetKey] ?? null;
};
