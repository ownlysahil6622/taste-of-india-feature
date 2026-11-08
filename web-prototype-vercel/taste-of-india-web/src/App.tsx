import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import cutoutFiles from "virtual:card-cutouts";
import MapArtwork from "./MapArtwork";

type Dish = {
  name: string;
  image: string;
  banner?: string;
  /** Transparent 450x500 cut-out for the sheet card. Filled in automatically (see withCutout). */
  cardImage?: string;
  description: string;
};

const DISH_CARD_WIDTH = 152;
const DISH_CARD_GAP = 8;
// The #F3F3F3 image panel at the top of each card, inside the card's 1px border (see .dish-media).
const CARD_MEDIA = { width: 150, height: 78 };
// Point in the image panel the photo zooms around on hover: its centre.
const CARD_FOCUS = { x: CARD_MEDIA.width / 2, y: CARD_MEDIA.height / 2 };

type Size = { width: number; height: number };
type CardImage = { src: string; style?: CSSProperties };

// Cut-outs are transparent PNGs with the dish centred in the file (the 45 current ones are 300x165).
// .dish-media centres them in the panel with flexbox at a fixed 114x63 size (see .dish-media > img).

// Fallback until a cut-out exists: the dish from the banner as a rounded photo, centred in the
// 150x78 image panel. Banners are 510px tall with the dish centred and ending by y≈357 (their own
// text starts at y≈360), so a 390x192 window from y 165 fills the 134x66 box.
const BANNER_HEIGHT = 510;
const FALLBACK_BOX = {
  left: (CARD_MEDIA.width - 134) / 2,
  top: (CARD_MEDIA.height - 66) / 2,
  width: 134,
  height: 66,
  radius: 8,
};

/**
 * Scales an image so its `window` (source px) lands on `box` in the image panel, clipped to the box
 * with rounded corners.
 */
function placeCardImage(source: Size, window: { x: number; y: number; width: number }, box: typeof FALLBACK_BOX): CSSProperties {
  const scale = box.width / window.width;
  const left = box.left - window.x * scale;
  const top = box.top - window.y * scale;
  const width = source.width * scale;
  const height = source.height * scale;
  return {
    position: "absolute",
    left,
    top,
    width,
    height,
    clipPath: `inset(${box.top - top}px ${left + width - box.left - box.width}px ${top + height - box.top - box.height}px ${box.left - left}px round ${box.radius}px)`,
    transformOrigin: `${CARD_FOCUS.x - left}px ${CARD_FOCUS.y - top}px`,
  };
}

/** The image shown on a dish card: its cut-out if there is one, otherwise a crop of its banner. */
function getCardImage(dish: Dish, state: StateData): CardImage {
  if (dish.cardImage) return { src: dish.cardImage };
  if (dish.banner) {
    const window = { x: state.bannerWidth / 2 - 195, y: 165, width: 390 };
    return { src: dish.banner, style: placeCardImage({ width: state.bannerWidth, height: BANNER_HEIGHT }, window, FALLBACK_BOX) };
  }
  const { radius, ...box } = FALLBACK_BOX;
  return { src: dish.image, style: { ...box, position: "absolute", objectFit: "cover", borderRadius: radius } };
}

// Cut-outs are picked up by file name: public/assets/cards/cutouts/<slug>.png, where the slug is the
// dish name in lowercase with "&" removed and spaces turned into hyphens ("Dal Makhni" → dal-makhni).
const CUTOUTS = new Set(cutoutFiles);

function dishSlug(name: string) {
  return name.toLowerCase().replace(/&/g, "").trim().replace(/\s+/g, "-");
}

function withCutout(dish: Dish): Dish {
  const file = `${dishSlug(dish.name)}.png`;
  return dish.cardImage || !CUTOUTS.has(file) ? dish : { ...dish, cardImage: `/assets/cards/cutouts/${file}` };
}

type StateData = {
  name: string;
  illustration: string;
  path: string;
  target: { left: string; top: string; width: string; height: string };
  marker: { x: number; y: number; image: string; count: number };
  /** Pixel width of this state's dish banners (all are 510px tall). */
  bannerWidth: number;
  dishes: Dish[];
};

const stateData: StateData[] = [
  {
    name: "Punjab",
    illustration: "/assets/b54b9.png",
    path: "M94 235 132 232 135 272 116 287 92 266Z",
    target: { left: "35%", top: "30%", width: "14%", height: "3.5%" },
    marker: { x: 115, y: 266, image: "/assets/1af0b.png", count: 5 },
    bannerWidth: 587,
    dishes: [
      { name: "Amritsari Kulche", image: "/assets/cards/punjab-amritsari-kulche.png", banner: "/assets/banners/amritsari-kulche.png", description: "Crisp stuffed kulcha with butter & chole" },
      { name: "Butter Chicken", image: "/assets/cards/punjab-butter-chicken.png", banner: "/assets/banners/butter-chicken.png", description: "Tandoori chicken in a silky makhani gravy" },
      { name: "Chole Bhature", image: "/assets/cards/punjab-chole-bhature.png", banner: "/assets/banners/chole-bhature.png", description: "Puffy fried bhature with spicy chickpeas" },
      { name: "Dal Makhni", image: "/assets/cards/punjab-dal-makhni.png", banner: "/assets/banners/dal-makhni.png", description: "Black lentils slow-cooked with cream" },
      { name: "Lassi", image: "/assets/cards/punjab-lassi.png", banner: "/assets/banners/lassi.png", description: "Thick, chilled yoghurt drink with malai" },
    ],
  },
  {
    name: "Uttar Pradesh",
    illustration: "/assets/16a3a.png",
    path: "M139 292 211 284 231 319 204 350 146 339Z",
    target: { left: "52%", top: "38%", width: "18%", height: "3.5%" },
    marker: { x: 175, y: 330, image: "/assets/87b02.png", count: 4 },
    bannerWidth: 635,
    dishes: [
      { name: "Gahloti Kebab", image: "/assets/cards/uttar-pradesh-gahloti-kebab.png", banner: "/assets/banners/gahloti-kebab.png", description: "Melt-in-the-mouth Lucknowi kebabs" },
      { name: "Awadhi Biryani", image: "/assets/cards/uttar-pradesh-awadhi-biryani.png", banner: "/assets/banners/awadhi-biryani.png", description: "Fragrant dum-cooked rice with tender meat" },
      { name: "Nihari", image: "/assets/cards/uttar-pradesh-nihari.png", banner: "/assets/banners/nihari.png", description: "Slow-simmered meat stew, rich and spiced" },
    ],
  },
  {
    name: "West Bengal",
    illustration: "/assets/e5130.png",
    path: "M274 343 306 346 311 403 282 413 270 381Z",
    target: { left: "78%", top: "44%", width: "22%", height: "3.5%" },
    marker: { x: 288, y: 380, image: "/assets/4e4f7.png", count: 5 },
    bannerWidth: 596,
    dishes: [
      { name: "Kosha Mangsho", image: "/assets/cards/west-bengal-kosha-mangsho.png", banner: "/assets/banners/kosha-mangsho.png", description: "Dark, slow-cooked Bengali mutton curry" },
      { name: "Kolkata Biryani", image: "/assets/cards/west-bengal-kolkata-biryani.png", banner: "/assets/banners/kolkata-biryani.png", description: "Light, fragrant biryani with potato & egg" },
      { name: "Kathi Roll", image: "/assets/cards/west-bengal-kathi-roll.png", banner: "/assets/banners/kathi-roll.png", description: "Flaky paratha rolled with spiced kebab" },
      { name: "Mishti Doi", image: "/assets/cards/west-bengal-mishti-doi.png", banner: "/assets/banners/_candidate-kathi-roll-1.png", description: "Sweet set curd in a clay pot" },
    ],
  },
  {
    name: "Maharashtra",
    illustration: "/assets/b1c0c.png",
    path: "M67 387 129 391 142 442 115 474 74 455Z",
    target: { left: "0%", top: "49%", width: "21%", height: "3.5%" },
    marker: { x: 97, y: 426, image: "/assets/52a48.png", count: 6 },
    bannerWidth: 587,
    dishes: [
      { name: "Vada Pav", image: "/assets/cards/maharashtra-vada-pav.png", banner: "/assets/banners/vada-pav.png", description: "Spiced potato fritter in soft, buttery pav" },
      { name: "Misal Pav", image: "/assets/cards/maharashtra-misal-pav.png", banner: "/assets/banners/misal-pav.png", description: "Fiery sprout curry with farsan" },
      { name: "Pav Bhaaji", image: "/assets/cards/maharashtra-pav-bhaaji.png", banner: "/assets/banners/pav-bhaaji.png", description: "Buttery mashed veg curry with toasted pav" },
      { name: "Puran Poli", image: "/assets/cards/maharashtra-puran-poli.png", banner: "/assets/banners/puran-poli.png", description: "Sweet flatbread filled with jaggery & dal" },
      { name: "Kolhapuri Mutton", image: "/assets/cards/maharashtra-kolhapuri-mutton.png", banner: "/assets/banners/kolhapuri-mutton.png", description: "Fiery mutton curry in bold Kolhapuri masala" },
    ],
  },
  {
    name: "Telangana",
    illustration: "/assets/396c1.png",
    path: "M137 415 184 414 195 454 176 477 143 463Z",
    target: { left: "45%", top: "52%", width: "18%", height: "3.5%" },
    marker: { x: 158, y: 454, image: "/assets/ab8bd.png", count: 2 },
    bannerWidth: 614,
    dishes: [
      { name: "Hyderabadi Biryani", image: "/assets/cards/telangana-hyderabadi-biryani.png", banner: "/assets/banners/hyderabadi-biryani.png", description: "Saffron-scented dum-cooked biryani" },
      { name: "Haleem", image: "/assets/cards/telangana-haleem.png", banner: "/assets/banners/haleem.png", description: "Slow-pounded wheat and meat, rich & hearty" },
      { name: "Mirchi ka Salan", image: "/assets/cards/telangana-mirchi-ka-salan.png", banner: "/assets/banners/mirchi-ka-salan.png", description: "Green chillies in tangy peanut-sesame gravy" },
      { name: "Double ka Meetha", image: "/assets/cards/telangana-double-ka-meetha.png", banner: "/assets/banners/double-ka-meetha.png", description: "Fried bread pudding soaked in saffron milk" },
      { name: "Qubani ka Meetha", image: "/assets/cards/telangana-qubani-ka-meetha.png", banner: "/assets/banners/_candidate-double-ka-meetha-1.png", description: "Stewed apricots with fresh cream" },
    ],
  },
  {
    name: "Andhra Pradesh",
    illustration: "/assets/e6def.png",
    path: "M164 465 215 456 220 505 181 526 158 501Z",
    target: { left: "50%", top: "58%", width: "23%", height: "3.5%" },
    marker: { x: 175, y: 500, image: "/assets/8d705.png", count: 6 },
    bannerWidth: 596,
    dishes: [
      { name: "Andhra Meal", image: "/assets/cards/andhra-pradesh-andhra-meal.png", banner: "/assets/banners/andhra-meal.png", description: "A fiery banana-leaf feast of curries & rice" },
      { name: "Gongura Mutton", image: "/assets/cards/andhra-pradesh-gongura-mutton.png", banner: "/assets/banners/gongura-mutton.png", description: "Tangy sorrel-leaf mutton curry" },
      { name: "Pesarattu Dish", image: "/assets/cards/andhra-pradesh-pesarattu-dish.png", banner: "/assets/banners/pesarattu-dish.png", description: "Crisp green-gram dosa with ginger chutney" },
      { name: "Guntur Chilli Chicken", image: "/assets/cards/andhra-pradesh-guntur-chilli-chicken.png", banner: "/assets/banners/guntur-chilli-chicken.png", description: "Fiery chicken tossed in Guntur chillies" },
      { name: "Ulavacharu Chicken Biryani", image: "/assets/cards/andhra-pradesh-ulavacharu-chicken-biryani.png", banner: "/assets/banners/ulavacharu-chicken-biryani.png", description: "Biryani with smoky horse-gram rasam" },
      { name: "Natu Kodi Pulusu", image: "/assets/cards/andhra-pradesh-natu-kodi-pulusu.png", banner: "/assets/banners/natu-kodi-pulusu.png", description: "Country chicken in a tangy, spicy gravy" },
    ],
  },
  {
    name: "Karnataka",
    illustration: "/assets/f1385.png",
    path: "M78 458 128 457 145 523 121 550 91 519Z",
    target: { left: "4%", top: "59%", width: "20%", height: "3.5%" },
    marker: { x: 97, y: 507, image: "/assets/13c75.png", count: 5 },
    bannerWidth: 587,
    dishes: [
      { name: "Benne Masala Dosa", image: "/assets/cards/karnataka-benne-masala-dosa.png", banner: "/assets/banners/benne-masala-dosa.png", description: "Butter-crisp dosa with spiced potato" },
      { name: "Bisi Bele Bath", image: "/assets/cards/karnataka-bisi-bele-bath.png", banner: "/assets/banners/bisi-bele-bath.png", description: "Spicy lentil rice with tamarind & ghee" },
      { name: "Donne Biryani", image: "/assets/cards/karnataka-donne-biryani.png", banner: "/assets/banners/donne-biryani.png", description: "Herby biryani served in a leaf bowl" },
      { name: "Mangalorian Buns", image: "/assets/cards/karnataka-mangalorian-buns.png", banner: "/assets/banners/mangalorian-buns.png", description: "Soft, sweet banana puris from Mangaluru" },
      { name: "Kori Rotti", image: "/assets/cards/karnataka-kori-rotti.png", banner: "/assets/banners/kori-rotti.png", description: "Spicy chicken curry with crisp rice wafers" },
    ],
  },
  {
    name: "Tamil Nadu",
    illustration: "/assets/571a8.png",
    path: "M132 527 180 517 180 579 149 608 130 573Z",
    target: { left: "46%", top: "64%", width: "20%", height: "3.5%" },
    marker: { x: 158, y: 550, image: "/assets/032d7.png", count: 4 },
    bannerWidth: 587,
    dishes: [
      { name: "Chetinad Chicken", image: "/assets/cards/tamil-nadu-chetinad-chicken.png", banner: "/assets/banners/chetinad-chicken.png", description: "Peppery chicken in Chettinad masala" },
      { name: "Kothu Parotta", image: "/assets/cards/tamil-nadu-kothu-parotta.png", banner: "/assets/banners/kothu-parotta.png", description: "Shredded parotta tossed with egg" },
      { name: "Pongal", image: "/assets/cards/tamil-nadu-pongal.png", banner: "/assets/banners/pongal.png", description: "Peppery rice and lentils in golden ghee" },
      { name: "Idli with Podi", image: "/assets/cards/tamil-nadu-idli-with-podi.png", banner: "/assets/banners/idli-with-podi.png", description: "Soft idlis dusted with spicy gunpowder" },
      { name: "Dindigul Biryani", image: "/assets/cards/tamil-nadu-dindigul-biryani.png", banner: "/assets/banners/dindigul-biryani.png", description: "Spicy short-grain mutton biryani" },
      { name: "Kari Dosa", image: "/assets/cards/tamil-nadu-kari-dosa.png", banner: "/assets/banners/kari-dosa.png", description: "Dosa topped with egg and spiced mince" },
    ],
  },
  {
    name: "Kerala",
    illustration: "/assets/a44f1.png",
    path: "M98 542 122 541 133 608 117 643 102 600Z",
    target: { left: "13%", top: "69%", width: "15%", height: "3.5%" },
    marker: { x: 120, y: 594, image: "/assets/50eed.png", count: 3 },
    bannerWidth: 587,
    dishes: [
      { name: "Appam with Stew", image: "/assets/cards/kerela-appam-with-stew.png", banner: "/assets/banners/appam-with-stew.png", description: "Lacy appams with a mild coconut stew" },
      { name: "Malabar Biryani", image: "/assets/cards/kerela-malabar-biryani.png", banner: "/assets/banners/malabar-biryani.png", description: "Kaima-rice biryani with crisp fried onions" },
      { name: "Puttu & Kadala Curry", image: "/assets/cards/kerela-puttu-kadala-curry.png", banner: "/assets/banners/puttu-kadala-curry.png", description: "Steamed rice puttu with chickpea curry" },
      { name: "Kappa & Meen Curry", image: "/assets/cards/kerela-kappa-meen-curry.png", banner: "/assets/banners/kappa-meen-curry.png", description: "Tapioca mash with fiery red fish curry" },
      { name: "Karimeen Pollichathu", image: "/assets/cards/kerela-karimeen-pollichathu.png", banner: "/assets/banners/karimeen-pollichathu.png", description: "Pearl spot fish roasted in banana leaf" },
      { name: "Pazham Pori", image: "/assets/89fe7.png", banner: "/assets/banners/pazham-pori.png", description: "Sweet ripe-banana fritters, crisp & golden" },
    ],
  },
];

const states: StateData[] = stateData.map((state) => ({ ...state, dishes: state.dishes.map(withCutout) }));

// Pins whose label sits on the left of the marker (the rest have it on the right).
const LABEL_LEFT_STATES = new Set(["Maharashtra", "Karnataka", "Kerala"]);
// North-to-south order for the marker drop-in stagger.
const DROP_ORDER = new Map([...states].sort((a, b) => a.marker.y - b.marker.y).map((state, index) => [state.name, index]));
// Markers that softly pulse to invite a first tap.
const INVITE_STATES = new Set(["Punjab", "Tamil Nadu"]);
// Map intro (400ms) + last marker drop (delay 380 + 8 × 50ms, 560ms long) ≈ 1.35s.
const INTRO_SETTLE_MS = 1400;
const INVITE_IDLE_MS = 2000;
const SHEET_SWAP_OUT_MS = 120;

// The map, markers, labels and hit areas live on one "stage" in the 390x844 design-frame
// coordinates. The whole stage is translated and scaled so the content fits the visible area.
const STAGE_WIDTH = 390;
const STAGE_HEIGHT = 844;
// Vertical bounds of the visible content on the stage (India artwork plus every marker).
const CONTENT_BOUNDS = { top: 192, bottom: 636 };
// Horizontal span of the markers + labels (Maharashtra label to West Bengal label), measured from
// the rendered pins. The map is fitted to this span so India fills the screen; the far edges of the
// artwork (Gujarat coast, North-East tip) may bleed slightly past the screen edge.
const MARKER_BOUNDS = { left: -8, right: 393 };
const MARKER_CENTER_X = (MARKER_BOUNDS.left + MARKER_BOUNDS.right) / 2;
const CONTENT_CENTER_Y = (CONTENT_BOUNDS.top + CONTENT_BOUNDS.bottom) / 2;
const FIT_MARGIN_X = 8;
const FIT_GAP_Y = 12;
const MAX_FIT_SCALE = 1.6;
// Selected-state zoom, multiplied on top of the fit scale (capped so no label is clipped).
const FOCUS_SCALE = 1.03;
const FOCUS_BOTTOM_GAP = 96;
// Height of the fixed white header (must match .map-header in index.css).
const HEADER_HEIGHT = 108;
const DRAG_THRESHOLD = 8;
const PAN_EDGE_MARGIN = 100;
const MAX_VERTICAL_DRAG = 80;
const SHEET_DISMISS_DISTANCE = 80;
const SHEET_DISMISS_VELOCITY = 0.8;

type MapFocus = { scale: number; x: number; y: number };

function computeWidthFit(width: number) {
  return (width - 2 * FIT_MARGIN_X) / (MARKER_BOUNDS.right - MARKER_BOUNDS.left);
}

// Scale at which the markers + labels fill the width and the map fits between the header and the tip.
function computeFitScale(width: number, height: number, tipHeight: number) {
  const availableHeight = height - tipHeight - HEADER_HEIGHT - 2 * FIT_GAP_Y;
  return Math.max(
    0.1,
    Math.min(MAX_FIT_SCALE, computeWidthFit(width), availableHeight / (CONTENT_BOUNDS.bottom - CONTENT_BOUNDS.top)),
  );
}

function computeMapFocus(
  width: number,
  height: number,
  obstruction: number,
  tipHeight: number,
  anchor: { x: number; y: number } | null,
): MapFocus {
  const fit = computeFitScale(width, height, tipHeight);
  if (!anchor) {
    // Default view: content centred in the area between the header and the discovery tip.
    const visibleBottom = height - tipHeight;
    return {
      scale: fit,
      x: width / 2 - fit * MARKER_CENTER_X,
      y: (HEADER_HEIGHT + visibleBottom) / 2 - fit * CONTENT_CENTER_Y,
    };
  }
  // Same for every state: zoom on top of the fit, keeping every label inside the side margins.
  const scale = Math.min(fit * FOCUS_SCALE, Math.max(fit, computeWidthFit(width)));
  const visibleBottom = height - obstruction;
  const maxY = HEADER_HEIGHT + FIT_GAP_Y - scale * CONTENT_BOUNDS.top;
  const minY = visibleBottom - FOCUS_BOTTOM_GAP - scale * CONTENT_BOUNDS.bottom;
  return {
    scale,
    // X is the same for every state (and matches the default view), so the map only moves vertically.
    x: width / 2 - scale * MARKER_CENTER_X,
    y: Math.min(maxY, Math.max(minY, (HEADER_HEIGHT + visibleBottom) / 2 - scale * anchor.y)),
  };
}

function computeMapPanBounds(height: number, obstruction: number, scale: number, restX: number, restY: number, locked: boolean) {
  // No state selected: the map can't be dragged at all.
  if (locked) return { minX: restX, maxX: restX, minY: restY, maxY: restY };
  const visibleBottom = height - obstruction;
  const markerYs = states.map((item) => item.marker.y);
  const markerMinY = HEADER_HEIGHT + PAN_EDGE_MARGIN - scale * Math.max(...markerYs);
  const markerMaxY = visibleBottom - PAN_EDGE_MARGIN - scale * Math.min(...markerYs);
  // Use whichever limit is tighter: the marker limits or MAX_VERTICAL_DRAG from rest.
  let minY = Math.max(markerMinY, restY - MAX_VERTICAL_DRAG);
  let maxY = Math.min(markerMaxY, restY + MAX_VERTICAL_DRAG);
  if (minY > maxY) {
    // Rest sits more than MAX_VERTICAL_DRAG outside the marker limits: hold at the position shown today.
    minY = maxY = clamp(restY, markerMinY, markerMaxY);
  }
  return {
    // Horizontal drag is locked: the map only scrolls vertically.
    minX: restX,
    maxX: restX,
    minY,
    maxY,
  };
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function hapticTick() {
  try {
    if ("vibrate" in navigator) navigator.vibrate(10);
  } catch {
    // Some browsers throw when vibration isn't allowed; haptics are optional.
  }
}

function useReportHeight(ref: RefObject<HTMLElement | null>, onHeight: (height: number) => void) {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const report = () => onHeight(element.getBoundingClientRect().height);
    report();
    const observer = new ResizeObserver(report);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, onHeight]);
}

function MapPin({
  state,
  selected,
  inviting,
  pulse,
  onSelect,
}: {
  state: StateData;
  selected: boolean;
  inviting: boolean;
  pulse: number;
  onSelect: (state: StateData) => void;
}) {
  const labelLeft = LABEL_LEFT_STATES.has(state.name);
  return (
    <button
      type="button"
      className={`pin ${labelLeft ? "pin--label-left" : ""} ${selected ? "is-selected" : ""} ${inviting ? "is-inviting" : ""}`}
      style={{ left: state.marker.x, top: state.marker.y, "--drop-order": DROP_ORDER.get(state.name) ?? 0 } as CSSProperties}
      onClick={() => onSelect(state)}
      aria-label={`Explore ${state.name}, ${state.dishes.length} dishes`}
      aria-pressed={selected}
    >
      <span className="pin-drop">
        <span className="pin-marker">
          {selected && <span key={`ripple-${pulse}`} className="pin-ripple" />}
          <span key={selected ? `pop-${pulse}` : "idle"} className="pin-body">
            <span className="pin-tile">
              <img src={state.marker.image} alt="" />
            </span>
            <span className="pin-count">{state.dishes.length}</span>
          </span>
          <span className="pin-ground" />
        </span>
        <span className="pin-label">{state.name}</span>
      </span>
    </button>
  );
}

function StateIllustration({ state, className = "" }: { state: StateData; className?: string }) {
  return (
    <div className={`state-illustration ${className}`}>
      {states.map((option) => (
        <img
          key={option.name}
          className={`illustration-image illustration-${option.name.toLowerCase().replace(/\s+/g, "-")} ${option.name === state.name ? "is-active" : ""}`}
          src={option.illustration}
          alt=""
        />
      ))}
    </div>
  );
}

function DiscoveryTip({ onHeight }: { onHeight: (height: number) => void }) {
  const tipRef = useRef<HTMLElement>(null);
  useReportHeight(tipRef, onHeight);
  return (
    <aside ref={tipRef} className="discovery-tip">
      <span className="tip-handle" />
      <div className="tip-row">
        <span className="tip-hand" aria-hidden="true">
          <img src="/assets/93d0c.png" alt="" />
        </span>
        <p>Tap a state to explore its famous dishes</p>
      </div>
    </aside>
  );
}

function DishCarousel({ state, onSelectDish }: { state: StateData; onSelectDish: (dish: Dish) => void }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const index =
        carousel.scrollLeft >= maxScroll - 4
          ? state.dishes.length - 1
          : Math.round(carousel.scrollLeft / (DISH_CARD_WIDTH + DISH_CARD_GAP));
      setActive(index);
    });
  };

  return (
    <>
      <div ref={carouselRef} className="dish-carousel" role="list" onScroll={handleScroll}>
        {state.dishes.map((dish, index) => {
          const image = getCardImage(dish, state);
          return (
            <div className="dish-slot" role="listitem" key={dish.name} style={{ "--card-order": index } as CSSProperties}>
              <button type="button" className="dish-card" onClick={() => onSelectDish(dish)}>
                <span className="dish-media">
                  <img src={image.src} alt="" style={image.style} />
                </span>
                <span className="dish-copy">
                  <strong>{dish.name}</strong>
                  <span>{dish.description}</span>
                  <small>
                    Explore <b aria-hidden="true">→</b>
                  </small>
                </span>
              </button>
            </div>
          );
        })}
      </div>
      <div className="carousel-dots" aria-hidden="true">
        {state.dishes.map((dish, index) => (
          <span key={dish.name} className={index === active ? "is-active" : ""} />
        ))}
      </div>
    </>
  );
}

function BottomSheet({
  state,
  onHeight,
  onClose,
  onSelectDish,
}: {
  state: StateData;
  onHeight: (height: number) => void;
  onClose: () => void;
  onSelectDish: (dish: Dish) => void;
}) {
  const sheetRef = useRef<HTMLElement>(null);
  const sheetDragRef = useRef<{ id: number; startY: number; startX: number; startTime: number; active: boolean } | null>(null);
  // The state whose dish cards are on screen. When the selected state changes, the old cards fade out
  // quickly, then the new cards mount and slide in. The header (illustration, name, subtitle) uses
  // `state` directly, so it updates instantly with no animation.
  const [shown, setShown] = useState(state);
  const [leaving, setLeaving] = useState(false);
  useReportHeight(sheetRef, onHeight);

  useEffect(() => {
    if (state.name === shown.name) {
      setLeaving(false);
      return;
    }
    setLeaving(true);
    const timer = window.setTimeout(() => {
      setShown(state);
      setLeaving(false);
    }, SHEET_SWAP_OUT_MS);
    return () => window.clearTimeout(timer);
  }, [state, shown.name]);

  const setSheetOffset = (offset: number | null, animate: boolean) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.transition = animate ? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)" : "none";
    sheet.style.transform = offset === null ? "" : `translateY(${offset}px)`;
  };

  const handleSheetPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(".dish-carousel")) return;
    sheetDragRef.current = { id: event.pointerId, startY: event.clientY, startX: event.clientX, startTime: event.timeStamp, active: false };
  };

  const handleSheetPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = sheetDragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const dy = event.clientY - drag.startY;
    const dx = event.clientX - drag.startX;
    if (!drag.active) {
      if (dy < DRAG_THRESHOLD || Math.abs(dx) > dy) return;
      drag.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setSheetOffset(Math.max(0, dy), false);
  };

  const handleSheetPointerEnd = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = sheetDragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    sheetDragRef.current = null;
    if (!drag.active) return;
    const dy = Math.max(0, event.clientY - drag.startY);
    const velocity = dy / Math.max(1, event.timeStamp - drag.startTime);
    if (dy > SHEET_DISMISS_DISTANCE || velocity > SHEET_DISMISS_VELOCITY) {
      setSheetOffset(sheetRef.current?.getBoundingClientRect().height ?? 400, true);
      window.setTimeout(onClose, 220);
    } else {
      setSheetOffset(0, true);
    }
  };

  return (
    <section
      ref={sheetRef}
      className="bottom-sheet"
      aria-label={`${state.name} popular regional dishes`}
      onPointerDown={handleSheetPointerDown}
      onPointerMove={handleSheetPointerMove}
      onPointerUp={handleSheetPointerEnd}
      onPointerCancel={handleSheetPointerEnd}
    >
      <button className="sheet-handle" onClick={onClose} aria-label="Close state details" />
      <div className="sheet-body">
        <div className="sheet-content">
          <header className="sheet-header">
            <StateIllustration state={state} />
            <div>
              <h2>{state.name}</h2>
              <p>Popular regional dishes</p>
            </div>
          </header>
          <div key={shown.name} className={`sheet-cards ${leaving ? "is-leaving" : ""}`}>
            <DishCarousel state={shown} onSelectDish={onSelectDish} />
          </div>
        </div>
      </div>
    </section>
  );
}

const restaurantItems = [
  { name: "Plain Idli", image: "/assets/18e54.png", price: "₹105", badge: "Bestseller" },
  { name: "Ghee Sambar Button Idli", image: "/assets/69f6e.png", price: "₹165" },
  { name: "Lemon Idli", image: "/assets/913d2.png", price: "₹165" },
];

function RestaurantCard() {
  return (
    <article className="restaurant-card">
      <header className="restaurant-header">
        <div>
          <p className="restaurant-offer"><span>●</span> 10-30% Lower</p>
          <h3>The Rameshwaram Cafe</h3>
          <p className="restaurant-meta"><strong>★ 4.4</strong> (12k+) <i /> 31 mins</p>
        </div>
        <span className="restaurant-arrow" aria-hidden="true">→</span>
      </header>
      <div className="restaurant-menu">
        {restaurantItems.map((item) => (
          <div className="menu-item" key={item.name}>
            <div className="menu-image">
              <img src={item.image} alt="" />
              {item.badge && <small>{item.badge}</small>}
              <button>Add</button>
            </div>
            <p className="menu-name"><span aria-hidden="true">▣</span> {item.name}</p>
            <strong className="menu-price">{item.price}</strong>
            <p className="other-apps">Other Apps: ₹120-₹140</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function DishDetail({
  dish,
  state,
  onBack,
}: {
  dish: Dish;
  state: StateData;
  onBack: () => void;
}) {
  const description =
    dish.name === "Vada Pav"
      ? "Maharashtra’s favorite snack - spiced potato fritters in soft pav, served with chutney and a spicy twist."
      : `${dish.name} is a much-loved ${state.name} classic, celebrated for its rich local flavours and comforting traditional taste.`;

  return (
    <section
      className="dish-detail-screen"
      aria-label={`${dish.name} collection`}
    >
      <div className="detail-scroll">
        <div className="detail-banner">
          <img src={dish.banner ?? dish.image} alt="" />
        </div>
        <div className="detail-results">
          {!dish.banner && (
            <div className="detail-fallback-heading">
              <p>{state.name}</p>
              <h1>{dish.name}</h1>
              <span>{description}</span>
            </div>
          )}
          <RestaurantCard />
          <RestaurantCard />
        </div>
      </div>
      <button className="detail-back" onClick={onBack} aria-label="Back to state dishes">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>
    </section>
  );
}

export default function App() {
  const [selected, setSelected] = useState<StateData | null>(null);
  const [detail, setDetail] = useState<{ dish: Dish } | null>(null);
  const [markerPulse, setMarkerPulse] = useState(0);
  const [obstruction, setObstruction] = useState(0);
  const [tipHeight, setTipHeight] = useState(0);
  const [hasTapped, setHasTapped] = useState(false);
  const [inviting, setInviting] = useState(false);
  const handleTipHeight = useCallback((height: number) => {
    setObstruction(height);
    setTipHeight(height);
  }, []);
  const shellRef = useRef<HTMLElement>(null);
  const [shellSize, setShellSize] = useState({ width: Math.min(window.innerWidth, 430), height: window.innerHeight });
  const [pan, setPan] = useState({ x: 0, y: 0 }); // pan.x stays 0: vertical drag only
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ id: number; startX: number; startY: number; panY: number; active: boolean } | null>(null);
  const justDraggedRef = useRef(false);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const measure = () => {
      const rect = shell.getBoundingClientRect();
      setShellSize((current) =>
        current.width === rect.width && current.height === rect.height ? current : { width: rect.width, height: rect.height },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [selected]);

  // After the entrance settles, pulse a couple of markers if nobody has tapped yet.
  useEffect(() => {
    if (hasTapped) {
      setInviting(false);
      return;
    }
    const timer = window.setTimeout(() => setInviting(true), INTRO_SETTLE_MS + INVITE_IDLE_MS);
    return () => window.clearTimeout(timer);
  }, [hasTapped]);

  const selectState = (state: StateData) => {
    if (justDraggedRef.current) return;
    setHasTapped(true);
    setSelected(state);
    setMarkerPulse((pulse) => pulse + 1);
    hapticTick();
  };

  // The detail page opens as a new history entry, so the browser back button closes it too.
  // The map screen stays mounted underneath, so the selected state, sheet and card scroll are kept.
  const openDish = (dish: Dish) => {
    setDetail({ dish });
    window.history.pushState({ tasteOfIndiaDetail: true }, "");
  };

  const closeDish = useCallback(() => {
    if (window.history.state?.tasteOfIndiaDetail) window.history.back(); // popstate below closes it
    else setDetail(null);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (detail) setDetail(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [detail]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (detail) closeDish();
      else setSelected(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [detail, closeDish]);

  useEffect(() => {
    states.forEach((state) => {
      const illustration = new Image();
      illustration.src = state.illustration;
      illustration.decode?.().catch(() => undefined);
    });
  }, []);

  const focus = computeMapFocus(shellSize.width, shellSize.height, obstruction, tipHeight, selected ? selected.marker : null);
  const bounds = computeMapPanBounds(shellSize.height, obstruction, focus.scale, focus.x, focus.y, !selected);
  const worldX = focus.x; // fixed for every state; bounds.minX === bounds.maxX
  const worldY = clamp(focus.y + pan.y, bounds.minY, bounds.maxY);
  const worldTransform = `translate(${worldX}px, ${worldY}px) scale(${focus.scale})`;

  const handleShellClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (!selected || justDraggedRef.current) return;
    if ((event.target as HTMLElement).closest(".bottom-sheet, .map-header, .dish-detail-screen, path, button")) return;
    setSelected(null);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, panY: worldY - focus.y, active: false };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.active) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      // Still counts as a drag (so the release isn't treated as a tap), even when nothing is selected.
      drag.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      if (selected) setDragging(true);
    }
    // Dragging only moves the map while a state is selected.
    if (!selected) return;
    setPan({ x: 0, y: drag.panY + dy });
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    if (drag.active) {
      setDragging(false);
      justDraggedRef.current = true;
      window.setTimeout(() => {
        justDraggedRef.current = false;
      }, 0);
    }
  };

  return (
    <main ref={shellRef} className={`app-shell ${selected ? "is-selected" : ""}`} onClick={handleShellClick}>
      <div className="map-glow" aria-hidden="true" />
      <div
        className="scene-transform"
        style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT, transform: worldTransform, transition: dragging ? "none" : undefined }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div className="map-artwork map-world map-intro" aria-hidden="true">
          <MapArtwork selectedState={selected?.name} />
        </div>
        <svg className="state-hitboxes" viewBox="0 0 390 844" preserveAspectRatio="none">
          {states.map((state) => (
            <path
              key={state.name}
              d={state.path}
              onClick={() => selectState(state)}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${state.name}`}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") selectState(state);
              }}
            />
          ))}
        </svg>
        <div className="pin-layer">
          {states.map((state) => (
            <MapPin
              key={state.name}
              state={state}
              selected={selected?.name === state.name}
              inviting={inviting && INVITE_STATES.has(state.name)}
              pulse={markerPulse}
              onSelect={selectState}
            />
          ))}
        </div>
      </div>

      <header className="map-header">
        <button
          className="back-action"
          onClick={() => selected && setSelected(null)}
          aria-label={selected ? "Close state details" : "Go back"}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="map-header-text">
          <h1>Taste of India</h1>
          <p>Explore cuisines by state</p>
        </div>
      </header>

      {!selected && <DiscoveryTip onHeight={handleTipHeight} />}

      {selected && (
        <BottomSheet
          state={selected}
          onHeight={setObstruction}
          onClose={() => setSelected(null)}
          onSelectDish={openDish}
        />
      )}

      {selected && detail && (
        <DishDetail dish={detail.dish} state={selected} onBack={closeDish} />
      )}
    </main>
  );
}
