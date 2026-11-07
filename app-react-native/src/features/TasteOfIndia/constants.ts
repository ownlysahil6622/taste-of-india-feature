import { Fonts } from '../../styles/constants/Constants';

export const TASTE_OF_INDIA_COLORS = {
  shell: '#FFF7FB',
  white: '#FFFFFF',
  black: '#000000',
  brand: '#FF297D',
  markerTile: '#FF80B8',
  markerSideTile: '#FFB3D6',
  markerSelected: '#E10C60',
  markerSelectedLeftTile: '#5E2033',
  markerSelectedRightTile: '#3E1221',
  border: '#E8E8E8',
  handle: '#F3F3F3',
  textPrimary: '#333333',
  textSecondary: '#5D5D5D',
  textMuted: '#949494',
  headerTitle: '#1A1A1A',
  headerSubtitle: '#6B6B6B',
  headerDivider: '#EFEFEF',
  titleAccent: '#9A0040',
  detailAccent: '#C00050',
  detailHero: '#FFB3D6',
  detailHeroFade: '#FFF0F7',
  success: '#008A25',
  successVeg: '#00A62B',
  ratingDot: '#FFD600',
  separator: '#D0D0D0',
  detailTintStart: 'rgba(255, 41, 125, 0.24)',
  detailTintEnd: 'rgba(83, 0, 31, 0.26)',
  detailBackScrim: 'rgba(0, 0, 0, 0.4)',
  detailDishShadow: 'rgba(28, 0, 11, 0.38)',
  dishCopyDescription: '#E8E8E8',
} as const;

export const TASTE_OF_INDIA_FONTS = {
  regular: Fonts.FigtreeRegular,
  medium: Fonts.FigtreeMedium,
  semiBold: Fonts.FigtreeSemiBold,
  bold: Fonts.FigtreeBold,
  display: Fonts.FrauncesSemiBold,
} as const;

export const TASTE_OF_INDIA_SHEET_SHADOW =
  '0px 16px 48px rgba(0, 0, 0, 0.14), 0px 8px 24px rgba(0, 0, 0, 0.1)';

export const TASTE_OF_INDIA_DESIGN_WIDTH = 390;
export const TASTE_OF_INDIA_DESIGN_HEIGHT = 844;

export const TASTE_OF_INDIA_MAP_SIZE = 461;
export const TASTE_OF_INDIA_MAP_TOP = 182;
export const TASTE_OF_INDIA_MAP_CENTER_OFFSET = 14.5;

// The map, markers, labels and hit areas sit on one stage in design-frame
// coordinates (DESIGN_WIDTH x DESIGN_HEIGHT). The stage is translated and
// scaled so the content fits between the header and the bottom panel.
// Pixel bounds of the visible content on the stage (India artwork incl. the
// North-East, plus every marker and label), measured from the artwork.
export const TASTE_OF_INDIA_CONTENT_BOUNDS = {
  left: 5,
  right: 415,
  top: 192,
  bottom: 636,
} as const;
// Horizontal span of the markers + labels only (Maharashtra to West Bengal).
export const TASTE_OF_INDIA_LABEL_BOUNDS = { left: 14, right: 376 } as const;
export const TASTE_OF_INDIA_FIT_MARGIN_X = 16;
export const TASTE_OF_INDIA_FIT_GAP_Y = 12;
export const TASTE_OF_INDIA_MAX_FIT_SCALE = 1.6;
// Selected-state zoom, multiplied on top of the fit scale (capped so no
// label is clipped at the side margins).
export const TASTE_OF_INDIA_FOCUS_SCALE = 1.03;
export const TASTE_OF_INDIA_FOCUS_BOTTOM_GAP = 96;
export const TASTE_OF_INDIA_PAN_EDGE_MARGIN = 100;
export const TASTE_OF_INDIA_MAX_VERTICAL_DRAG = 80;
export const TASTE_OF_INDIA_SCENE_PAD_X = 400;
export const TASTE_OF_INDIA_SCENE_PAD_Y = 900;
export const TASTE_OF_INDIA_SHEET_DISMISS_DISTANCE = 80;
export const TASTE_OF_INDIA_SHEET_DISMISS_VELOCITY = 800;
export const TASTE_OF_INDIA_SHEET_DISMISS_DURATION_MS = 220;
// Fixed white map header. Total height = max(MIN_TOP, safe-area top) + CONTENT_HEIGHT
// (108pt with the minimum top, matching HEADER_HEIGHT in the web prototype).
export const TASTE_OF_INDIA_HEADER_MIN_TOP = 40;
export const TASTE_OF_INDIA_HEADER_CONTENT_HEIGHT = 68;
export const TASTE_OF_INDIA_HEADER_PADDING_BOTTOM = 12;
export const TASTE_OF_INDIA_HEADER_PADDING_X = 20;
export const TASTE_OF_INDIA_HEADER_GAP = 16;
export const TASTE_OF_INDIA_HEADER_BACK_SIZE = 44;
export const TASTE_OF_INDIA_SCENE_DURATION_MS = 520;
export const TASTE_OF_INDIA_DISCOVERY_TIP_DURATION_MS = 420;
export const TASTE_OF_INDIA_BOTTOM_SHEET_DURATION_MS = 520;

export const TASTE_OF_INDIA_MARKER_HIT_SIZE = 54;
export const TASTE_OF_INDIA_MARKER_HIT_RADIUS = 14;
export const TASTE_OF_INDIA_MARKER_ANCHOR_CENTER_X = 195;

export const TASTE_OF_INDIA_DETAIL_HERO_HEIGHT = 340;
export const TASTE_OF_INDIA_DETAIL_RESULTS_OFFSET = 337;

export const TASTE_OF_INDIA_MARKER_SHADOW_GRADIENT =
  'radial-gradient(ellipse closest-side, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)';

export const TASTE_OF_INDIA_DISH_SHADOW_GRADIENT =
  'radial-gradient(ellipse closest-side, rgba(28, 0, 11, 0.38) 0%, rgba(28, 0, 11, 0.22) 55%, rgba(28, 0, 11, 0) 100%)';

export const TASTE_OF_INDIA_COLLECTION_BACK_TOP_GAP = 10;
export const TASTE_OF_INDIA_COLLECTION_BACK_LEFT = 12;
export const TASTE_OF_INDIA_BANNER_ASPECT_RATIO = 39 / 34;
export const TASTE_OF_INDIA_BANNER_PLACEHOLDER_COLOR = '#F3F3F3';
export const TASTE_OF_INDIA_BACK_ICON_COLOR = '#111111';

export const TASTE_OF_INDIA_SHEET_MAX_HEIGHT_RATIO = 0.5;

export const TASTE_OF_INDIA_DISH_OVERLAY_COLORS = [
  'rgba(14, 14, 14, 0)',
  'rgba(14, 14, 14, 0.7)',
  'rgba(14, 14, 14, 1)',
];
export const TASTE_OF_INDIA_DISH_OVERLAY_LOCATIONS = [0, 0.3, 1];
