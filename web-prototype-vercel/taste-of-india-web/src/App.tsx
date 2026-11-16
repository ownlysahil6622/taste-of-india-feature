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
import MapArtwork from "./MapArtwork";
import handTapImage from "./assets/hand-tap.webp";

// Images live in src/assets/, so the build gives each one a URL with a hash of its content (e.g.
// /assets/lassi-B2kq9d1x.webp). Browsers can cache those for a year, and a replaced image gets a
// new URL, so nobody sees a stale copy. Each folder is looked up by file name without extension.
function byName(files: Record<string, string>): Record<string, string> {
  // A .webp wins over a .png with the same name (glob results are sorted, so it comes later).
  return Object.fromEntries(Object.entries(files).map(([file, url]) => [file.replace(/^.*\/|\.\w+$/g, ""), url]));
}
const MARKERS = byName(import.meta.glob<string>("./assets/markers/*.{webp,png}", { eager: true, query: "?url", import: "default" }));
const ILLUSTRATIONS = byName(import.meta.glob<string>("./assets/illustrations/*.{webp,png}", { eager: true, query: "?url", import: "default" }));
const BANNERS = byName(import.meta.glob<string>("./assets/banners/*.{webp,png}", { eager: true, query: "?url", import: "default" }));
const CUTOUTS = byName(import.meta.glob<string>("./assets/cutouts/*.{webp,png}", { eager: true, query: "?url", import: "default" }));
const MENU_PHOTOS = byName(import.meta.glob<string>("./assets/menu/*.{webp,png}", { eager: true, query: "?url", import: "default" }));

/** URL of an image in one of the folders above; a missing file stops the app with a clear error. */
function asset(folder: Record<string, string>, name: string): string {
  const url = folder[name];
  if (!url) throw new Error(`Missing image "${name}" in src/assets/`);
  return url;
}

type Dish = {
  name: string;
  banner: string;
  /** Transparent cut-out for the sheet card. Filled in automatically (see withCutout). */
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

// Cut-outs are transparent WebPs with the dish centred in the file (the 45 current ones are 300x165).
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
  const window = { x: state.bannerWidth / 2 - 195, y: 165, width: 390 };
  return { src: dish.banner, style: placeCardImage({ width: state.bannerWidth, height: BANNER_HEIGHT }, window, FALLBACK_BOX) };
}

// Cut-outs are picked up by file name: src/assets/cutouts/<slug>.webp (or .png), where the slug is the
// dish name in lowercase with "&" removed and spaces turned into hyphens ("Dal Makhni" → dal-makhni).

function dishSlug(name: string) {
  return name.toLowerCase().replace(/&/g, "").trim().replace(/\s+/g, "-");
}

function withCutout(dish: Dish): Dish {
  const cutout = CUTOUTS[dishSlug(dish.name)];
  return dish.cardImage || !cutout ? dish : { ...dish, cardImage: cutout };
}

// Banners download when their state is tapped, so a dish page opens with its banner ready.
const preloadedBanners = new Set<string>();
function preloadBanners(state: StateData) {
  for (const { banner } of state.dishes) {
    if (preloadedBanners.has(banner)) continue;
    preloadedBanners.add(banner);
    new Image().src = banner;
  }
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
    illustration: asset(ILLUSTRATIONS, "punjab"),
    path: "M94 235 132 232 135 272 116 287 92 266Z",
    target: { left: "35%", top: "30%", width: "14%", height: "3.5%" },
    marker: { x: 115, y: 266, image: asset(MARKERS, "punjab"), count: 5 },
    bannerWidth: 587,
    dishes: [
      { name: "Amritsari Kulche", banner: asset(BANNERS, "amritsari-kulche"), description: "Crisp stuffed kulcha with butter & chole" },
      { name: "Butter Chicken", banner: asset(BANNERS, "butter-chicken"), description: "Tandoori chicken in a silky makhani gravy" },
      { name: "Chole Bhature", banner: asset(BANNERS, "chole-bhature"), description: "Puffy fried bhature with spicy chickpeas" },
      { name: "Dal Makhni", banner: asset(BANNERS, "dal-makhni"), description: "Black lentils slow-cooked with cream" },
      { name: "Lassi", banner: asset(BANNERS, "lassi"), description: "Thick, chilled yoghurt drink with malai" },
    ],
  },
  {
    name: "Uttar Pradesh",
    illustration: asset(ILLUSTRATIONS, "uttar-pradesh"),
    path: "M139 292 211 284 231 319 204 350 146 339Z",
    target: { left: "52%", top: "38%", width: "18%", height: "3.5%" },
    marker: { x: 175, y: 330, image: asset(MARKERS, "uttar-pradesh"), count: 4 },
    bannerWidth: 635,
    dishes: [
      { name: "Gahloti Kebab", banner: asset(BANNERS, "gahloti-kebab"), description: "Melt-in-the-mouth Lucknowi kebabs" },
      { name: "Awadhi Biryani", banner: asset(BANNERS, "awadhi-biryani"), description: "Fragrant dum-cooked rice with tender meat" },
      { name: "Nihari", banner: asset(BANNERS, "nihari"), description: "Slow-simmered meat stew, rich and spiced" },
    ],
  },
  {
    name: "West Bengal",
    illustration: asset(ILLUSTRATIONS, "west-bengal"),
    path: "M274 343 306 346 311 403 282 413 270 381Z",
    target: { left: "78%", top: "44%", width: "22%", height: "3.5%" },
    marker: { x: 288, y: 380, image: asset(MARKERS, "west-bengal"), count: 5 },
    bannerWidth: 596,
    dishes: [
      { name: "Kosha Mangsho", banner: asset(BANNERS, "kosha-mangsho"), description: "Dark, slow-cooked Bengali mutton curry" },
      { name: "Kolkata Biryani", banner: asset(BANNERS, "kolkata-biryani"), description: "Light, fragrant biryani with potato & egg" },
      { name: "Kathi Roll", banner: asset(BANNERS, "kathi-roll"), description: "Flaky paratha rolled with spiced kebab" },
      { name: "Mishti Doi", banner: asset(BANNERS, "_candidate-kathi-roll-1"), description: "Sweet set curd in a clay pot" },
    ],
  },
  {
    name: "Maharashtra",
    illustration: asset(ILLUSTRATIONS, "maharashtra"),
    path: "M67 387 129 391 142 442 115 474 74 455Z",
    target: { left: "0%", top: "49%", width: "21%", height: "3.5%" },
    marker: { x: 97, y: 426, image: asset(MARKERS, "maharashtra"), count: 6 },
    bannerWidth: 587,
    dishes: [
      { name: "Vada Pav", banner: asset(BANNERS, "vada-pav"), description: "Spiced potato fritter in soft, buttery pav" },
      { name: "Misal Pav", banner: asset(BANNERS, "misal-pav"), description: "Fiery sprout curry with farsan" },
      { name: "Pav Bhaaji", banner: asset(BANNERS, "pav-bhaaji"), description: "Buttery mashed veg curry with toasted pav" },
      { name: "Puran Poli", banner: asset(BANNERS, "puran-poli"), description: "Sweet flatbread filled with jaggery & dal" },
      { name: "Kolhapuri Mutton", banner: asset(BANNERS, "kolhapuri-mutton"), description: "Fiery mutton curry in bold Kolhapuri masala" },
    ],
  },
  {
    name: "Telangana",
    illustration: asset(ILLUSTRATIONS, "telangana"),
    path: "M137 415 184 414 195 454 176 477 143 463Z",
    target: { left: "45%", top: "52%", width: "18%", height: "3.5%" },
    marker: { x: 158, y: 454, image: asset(MARKERS, "telangana"), count: 2 },
    bannerWidth: 614,
    dishes: [
      { name: "Hyderabadi Biryani", banner: asset(BANNERS, "hyderabadi-biryani"), description: "Saffron-scented dum-cooked biryani" },
      { name: "Haleem", banner: asset(BANNERS, "haleem"), description: "Slow-pounded wheat and meat, rich & hearty" },
      { name: "Mirchi ka Salan", banner: asset(BANNERS, "mirchi-ka-salan"), description: "Green chillies in tangy peanut-sesame gravy" },
      { name: "Double ka Meetha", banner: asset(BANNERS, "double-ka-meetha"), description: "Fried bread pudding soaked in saffron milk" },
      { name: "Qubani ka Meetha", banner: asset(BANNERS, "_candidate-double-ka-meetha-1"), description: "Stewed apricots with fresh cream" },
    ],
  },
  {
    name: "Andhra Pradesh",
    illustration: asset(ILLUSTRATIONS, "andhra-pradesh"),
    path: "M164 465 215 456 220 505 181 526 158 501Z",
    target: { left: "50%", top: "58%", width: "23%", height: "3.5%" },
    marker: { x: 175, y: 500, image: asset(MARKERS, "andhra-pradesh"), count: 6 },
    bannerWidth: 596,
    dishes: [
      { name: "Andhra Meal", banner: asset(BANNERS, "andhra-meal"), description: "A fiery banana-leaf feast of curries & rice" },
      { name: "Gongura Mutton", banner: asset(BANNERS, "gongura-mutton"), description: "Tangy sorrel-leaf mutton curry" },
      { name: "Pesarattu Dish", banner: asset(BANNERS, "pesarattu-dish"), description: "Crisp green-gram dosa with ginger chutney" },
      { name: "Guntur Chilli Chicken", banner: asset(BANNERS, "guntur-chilli-chicken"), description: "Fiery chicken tossed in Guntur chillies" },
      { name: "Ulavacharu Chicken Biryani", banner: asset(BANNERS, "ulavacharu-chicken-biryani"), description: "Biryani with smoky horse-gram rasam" },
      { name: "Natu Kodi Pulusu", banner: asset(BANNERS, "natu-kodi-pulusu"), description: "Country chicken in a tangy, spicy gravy" },
    ],
  },
  {
    name: "Karnataka",
    illustration: asset(ILLUSTRATIONS, "karnataka"),
    path: "M78 458 128 457 145 523 121 550 91 519Z",
    target: { left: "4%", top: "59%", width: "20%", height: "3.5%" },
    marker: { x: 97, y: 507, image: asset(MARKERS, "karnataka"), count: 5 },
    bannerWidth: 587,
    dishes: [
      { name: "Benne Masala Dosa", banner: asset(BANNERS, "benne-masala-dosa"), description: "Butter-crisp dosa with spiced potato" },
      { name: "Bisi Bele Bath", banner: asset(BANNERS, "bisi-bele-bath"), description: "Spicy lentil rice with tamarind & ghee" },
      { name: "Donne Biryani", banner: asset(BANNERS, "donne-biryani"), description: "Herby biryani served in a leaf bowl" },
      { name: "Mangalorian Buns", banner: asset(BANNERS, "mangalorian-buns"), description: "Soft, sweet banana puris from Mangaluru" },
      { name: "Kori Rotti", banner: asset(BANNERS, "kori-rotti"), description: "Spicy chicken curry with crisp rice wafers" },
    ],
  },
  {
    name: "Tamil Nadu",
    illustration: asset(ILLUSTRATIONS, "tamil-nadu"),
    path: "M132 527 180 517 180 579 149 608 130 573Z",
    target: { left: "46%", top: "64%", width: "20%", height: "3.5%" },
    marker: { x: 158, y: 550, image: asset(MARKERS, "tamil-nadu"), count: 4 },
    bannerWidth: 587,
    dishes: [
      { name: "Chetinad Chicken", banner: asset(BANNERS, "chetinad-chicken"), description: "Peppery chicken in Chettinad masala" },
      { name: "Kothu Parotta", banner: asset(BANNERS, "kothu-parotta"), description: "Shredded parotta tossed with egg" },
      { name: "Pongal", banner: asset(BANNERS, "pongal"), description: "Peppery rice and lentils in golden ghee" },
      { name: "Idli with Podi", banner: asset(BANNERS, "idli-with-podi"), description: "Soft idlis dusted with spicy gunpowder" },
      { name: "Dindigul Biryani", banner: asset(BANNERS, "dindigul-biryani"), description: "Spicy short-grain mutton biryani" },
      { name: "Kari Dosa", banner: asset(BANNERS, "kari-dosa"), description: "Dosa topped with egg and spiced mince" },
    ],
  },
  {
    name: "Kerala",
    illustration: asset(ILLUSTRATIONS, "kerala"),
    path: "M98 542 122 541 133 608 117 643 102 600Z",
    target: { left: "13%", top: "69%", width: "15%", height: "3.5%" },
    marker: { x: 120, y: 594, image: asset(MARKERS, "kerala"), count: 3 },
    bannerWidth: 587,
    dishes: [
      { name: "Appam with Stew", banner: asset(BANNERS, "appam-with-stew"), description: "Lacy appams with a mild coconut stew" },
      { name: "Malabar Biryani", banner: asset(BANNERS, "malabar-biryani"), description: "Kaima-rice biryani with crisp fried onions" },
      { name: "Puttu & Kadala Curry", banner: asset(BANNERS, "puttu-kadala-curry"), description: "Steamed rice puttu with chickpea curry" },
      { name: "Kappa & Meen Curry", banner: asset(BANNERS, "kappa-meen-curry"), description: "Tapioca mash with fiery red fish curry" },
      { name: "Karimeen Pollichathu", banner: asset(BANNERS, "karimeen-pollichathu"), description: "Pearl spot fish roasted in banana leaf" },
      { name: "Pazham Pori", banner: asset(BANNERS, "pazham-pori"), description: "Sweet ripe-banana fritters, crisp & golden" },
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

// Illustrations that have finished loading in this visit.
const loadedIllustrations = new Set<string>();

/**
 * Each state's illustration downloads the first time that state is opened. While a new one loads,
 * the previous illustration stays on screen, then it swaps instantly, as before.
 */
function StateIllustration({ state, className = "" }: { state: StateData; className?: string }) {
  const [opened, setOpened] = useState(() => [state.name]);
  const [shown, setShown] = useState(() => (loadedIllustrations.has(state.name) ? state.name : null));
  if (!opened.includes(state.name)) setOpened([...opened, state.name]);

  useEffect(() => {
    if (loadedIllustrations.has(state.name)) setShown(state.name);
  }, [state.name]);

  const handleLoad = (name: string) => {
    loadedIllustrations.add(name);
    if (name === state.name) setShown(name);
  };

  return (
    <div className={`state-illustration ${className}`}>
      {states
        .filter((option) => opened.includes(option.name))
        .map((option) => (
          <img
            key={option.name}
            className={`illustration-image illustration-${option.name.toLowerCase().replace(/\s+/g, "-")} ${option.name === shown ? "is-active" : ""}`}
            src={option.illustration}
            alt=""
            onLoad={() => handleLoad(option.name)}
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
          <img src={handTapImage} alt="" />
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

  // Card images load as their card comes within half a card of the visible area, so opening a
  // state only downloads the cards on screen (the first two plus the one peeking in).
  // (loading="lazy" doesn't help here: browsers start any image within ~1250px, i.e. all cards.)
  const [reveal, setReveal] = useState({ name: state.name, count: 2 });
  const revealed = reveal.name === state.name ? reveal.count : 2;
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const last = Math.max(...entries.filter((entry) => entry.isIntersecting).map((entry) => Number((entry.target as HTMLElement).dataset.index)));
        if (last < 0 || !Number.isFinite(last)) return;
        setReveal((current) => ({ name: state.name, count: Math.max(current.name === state.name ? current.count : 2, last + 1) }));
      },
      { root: carousel, rootMargin: `0px ${DISH_CARD_WIDTH / 2}px` },
    );
    carousel.querySelectorAll(".dish-slot").forEach((slot) => observer.observe(slot));
    return () => observer.disconnect();
  }, [state.name]);

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
            <div className="dish-slot" role="listitem" key={dish.name} data-index={index} style={{ "--card-order": index } as CSSProperties}>
              <button type="button" className="dish-card" onClick={() => onSelectDish(dish)}>
                <span className="dish-media">
                  <img src={index < revealed ? image.src : undefined} alt="" style={image.style} decoding="async" />
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
  { name: "Plain Idli", image: asset(MENU_PHOTOS, "plain-idli"), price: "₹105", badge: "Bestseller" },
  { name: "Ghee Sambar Button Idli", image: asset(MENU_PHOTOS, "ghee-sambar-button-idli"), price: "₹165" },
  { name: "Lemon Idli", image: asset(MENU_PHOTOS, "lemon-idli"), price: "₹165" },
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
              <img src={item.image} alt="" loading="lazy" decoding="async" />
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

/** Arrow used by both back buttons (map header and dish detail). */
function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
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
          <img src={dish.banner} alt="" fetchPriority="high" />
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
      <button className="back-button detail-back" onClick={onBack} aria-label="Back to state dishes">
        <BackIcon />
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
    preloadBanners(state);
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
        <div className="map-artwork map-intro" aria-hidden="true">
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
          className="back-button"
          onClick={() => selected && setSelected(null)}
          aria-label={selected ? "Close state details" : "Go back"}
        >
          <BackIcon />
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
