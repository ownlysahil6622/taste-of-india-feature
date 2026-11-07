import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type RefObject } from "react";
import MapArtwork from "./MapArtwork";

type Dish = {
  name: string;
  image: string;
  banner?: string;
  description: string;
};

/**
 * x/y/width: the source region whose width fills the card. height: how much of the source to show
 * from y before cutting off (hides text baked into a banner); fillColor fills the card below that.
 */
type CardCrop = {
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
};

const DISH_CARD_WIDTH = 152;

function cardCropStyle(crop: CardCrop) {
  const scale = DISH_CARD_WIDTH / crop.width;
  return {
    position: "absolute" as const,
    left: -crop.x * scale,
    top: -crop.y * scale,
    width: crop.sourceWidth * scale,
    height: crop.sourceHeight * scale,
    maxWidth: "none",
    objectFit: "fill" as const,
    clipPath: `inset(0 0 ${(crop.sourceHeight - crop.y - crop.height) * scale}px 0)`,
  };
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

const description = "A much-loved regional dish, layered with local spices and traditional flavours.";

// Dish cards reuse each dish's banner. Every banner is 510px tall with the same layout: dish centred
// horizontally, ending by y≈356, and the banner's own text starting at y≈360. Some states' banners
// are padded wider (587–635px), so the crop is centred on the banner's width: a 303px-wide window
// from y 175, cut off at y 357 with the rest of the card filled in the banner's pale pink.
function bannerCardCrop(bannerWidth: number): CardCrop {
  return { sourceWidth: bannerWidth, sourceHeight: 510, x: bannerWidth / 2 - 151.5, y: 175, width: 303, height: 182, fillColor: "#ffe9f3" };
}

const states: StateData[] = [
  {
    name: "Punjab",
    illustration: "/assets/b54b9.png",
    path: "M94 235 132 232 135 272 116 287 92 266Z",
    target: { left: "35%", top: "30%", width: "14%", height: "3.5%" },
    marker: { x: 115, y: 266, image: "/assets/1af0b.png", count: 5 },
    bannerWidth: 587,
    dishes: [
      { name: "Amritsari Kulche", image: "/assets/cards/punjab-amritsari-kulche.png", banner: "/assets/banners/amritsari-kulche.png", description },
      { name: "Butter Chicken", image: "/assets/cards/punjab-butter-chicken.png", banner: "/assets/banners/butter-chicken.png", description },
      { name: "Chole Bhature", image: "/assets/cards/punjab-chole-bhature.png", banner: "/assets/banners/chole-bhature.png", description },
      { name: "Dal Makhni", image: "/assets/cards/punjab-dal-makhni.png", banner: "/assets/banners/dal-makhni.png", description },
      { name: "Lassi", image: "/assets/cards/punjab-lassi.png", banner: "/assets/banners/lassi.png", description },
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
      { name: "Gahloti Kebab", image: "/assets/cards/uttar-pradesh-gahloti-kebab.png", banner: "/assets/banners/gahloti-kebab.png", description },
      { name: "Awadhi Biryani", image: "/assets/cards/uttar-pradesh-awadhi-biryani.png", banner: "/assets/banners/awadhi-biryani.png", description },
      { name: "Nihari", image: "/assets/cards/uttar-pradesh-nihari.png", banner: "/assets/banners/nihari.png", description },
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
      { name: "Kosha Mangsho", image: "/assets/cards/west-bengal-kosha-mangsho.png", banner: "/assets/banners/kosha-mangsho.png", description },
      { name: "Kolkata Biryani", image: "/assets/cards/west-bengal-kolkata-biryani.png", banner: "/assets/banners/kolkata-biryani.png", description },
      { name: "Kathi Roll", image: "/assets/cards/west-bengal-kathi-roll.png", banner: "/assets/banners/kathi-roll.png", description },
      { name: "Mishti Doi", image: "/assets/cards/west-bengal-mishti-doi.png", banner: "/assets/banners/_candidate-kathi-roll-1.png", description },
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
      { name: "Vada Pav", image: "/assets/cards/maharashtra-vada-pav.png", banner: "/assets/banners/vada-pav.png", description },
      { name: "Misal Pav", image: "/assets/cards/maharashtra-misal-pav.png", banner: "/assets/banners/misal-pav.png", description },
      { name: "Pav Bhaaji", image: "/assets/cards/maharashtra-pav-bhaaji.png", banner: "/assets/banners/pav-bhaaji.png", description },
      { name: "Puran Poli", image: "/assets/cards/maharashtra-puran-poli.png", banner: "/assets/banners/puran-poli.png", description },
      { name: "Kolhapuri Mutton", image: "/assets/cards/maharashtra-kolhapuri-mutton.png", banner: "/assets/banners/kolhapuri-mutton.png", description },
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
      { name: "Hyderabadi Biryani", image: "/assets/cards/telangana-hyderabadi-biryani.png", banner: "/assets/banners/hyderabadi-biryani.png", description },
      { name: "Haleem", image: "/assets/cards/telangana-haleem.png", banner: "/assets/banners/haleem.png", description },
      { name: "Mirchi ka Salan", image: "/assets/cards/telangana-mirchi-ka-salan.png", banner: "/assets/banners/mirchi-ka-salan.png", description },
      { name: "Double ka Meetha", image: "/assets/cards/telangana-double-ka-meetha.png", banner: "/assets/banners/double-ka-meetha.png", description },
      { name: "Qubani ka Meetha", image: "/assets/cards/telangana-qubani-ka-meetha.png", banner: "/assets/banners/_candidate-double-ka-meetha-1.png", description },
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
      { name: "Andhra Meal", image: "/assets/cards/andhra-pradesh-andhra-meal.png", banner: "/assets/banners/andhra-meal.png", description },
      { name: "Gongura Mutton", image: "/assets/cards/andhra-pradesh-gongura-mutton.png", banner: "/assets/banners/gongura-mutton.png", description },
      { name: "Pesarattu Dish", image: "/assets/cards/andhra-pradesh-pesarattu-dish.png", banner: "/assets/banners/pesarattu-dish.png", description },
      { name: "Guntur Chilli Chicken", image: "/assets/cards/andhra-pradesh-guntur-chilli-chicken.png", banner: "/assets/banners/guntur-chilli-chicken.png", description },
      { name: "Ulavacharu Chicken Biryani", image: "/assets/cards/andhra-pradesh-ulavacharu-chicken-biryani.png", banner: "/assets/banners/ulavacharu-chicken-biryani.png", description },
      { name: "Natu Kodi Pulusu", image: "/assets/cards/andhra-pradesh-natu-kodi-pulusu.png", banner: "/assets/banners/natu-kodi-pulusu.png", description },
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
      { name: "Benne Masala Dosa", image: "/assets/cards/karnataka-benne-masala-dosa.png", banner: "/assets/banners/benne-masala-dosa.png", description },
      { name: "Bisi Bele Bath", image: "/assets/cards/karnataka-bisi-bele-bath.png", banner: "/assets/banners/bisi-bele-bath.png", description },
      { name: "Donne Biryani", image: "/assets/cards/karnataka-donne-biryani.png", banner: "/assets/banners/donne-biryani.png", description },
      { name: "Mangalorian Buns", image: "/assets/cards/karnataka-mangalorian-buns.png", banner: "/assets/banners/mangalorian-buns.png", description },
      { name: "Kori Rotti", image: "/assets/cards/karnataka-kori-rotti.png", banner: "/assets/banners/kori-rotti.png", description },
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
      { name: "Chetinad Chicken", image: "/assets/cards/tamil-nadu-chetinad-chicken.png", banner: "/assets/banners/chetinad-chicken.png", description },
      { name: "Kothu Parotta", image: "/assets/cards/tamil-nadu-kothu-parotta.png", banner: "/assets/banners/kothu-parotta.png", description },
      { name: "Pongal", image: "/assets/cards/tamil-nadu-pongal.png", banner: "/assets/banners/pongal.png", description },
      { name: "Idli with Podi", image: "/assets/cards/tamil-nadu-idli-with-podi.png", banner: "/assets/banners/idli-with-podi.png", description },
      { name: "Dindigul Biryani", image: "/assets/cards/tamil-nadu-dindigul-biryani.png", banner: "/assets/banners/dindigul-biryani.png", description },
      { name: "Kari Dosa", image: "/assets/cards/tamil-nadu-kari-dosa.png", banner: "/assets/banners/kari-dosa.png", description },
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
      { name: "Appam with Stew", image: "/assets/cards/kerela-appam-with-stew.png", banner: "/assets/banners/appam-with-stew.png", description },
      { name: "Malabar Biryani", image: "/assets/cards/kerela-malabar-biryani.png", banner: "/assets/banners/malabar-biryani.png", description },
      { name: "Puttu & Kadala Curry", image: "/assets/cards/kerela-puttu-kadala-curry.png", banner: "/assets/banners/puttu-kadala-curry.png", description },
      { name: "Kappa & Meen Curry", image: "/assets/cards/kerela-kappa-meen-curry.png", banner: "/assets/banners/kappa-meen-curry.png", description },
      { name: "Karimeen Pollichathu", image: "/assets/cards/kerela-karimeen-pollichathu.png", banner: "/assets/banners/karimeen-pollichathu.png", description },
      { name: "Pazham Pori", image: "/assets/89fe7.png", banner: "/assets/banners/pazham-pori.png", description },
    ],
  },
];

// The map, markers, labels and hit areas live on one "stage" in the 390x844 design-frame
// coordinates. The whole stage is translated and scaled so the content fits the visible area.
const STAGE_WIDTH = 390;
const STAGE_HEIGHT = 844;
// Pixel bounds of the visible content on the stage (India artwork incl. the North-East,
// plus every marker and label), measured from the rendered artwork.
const CONTENT_BOUNDS = { left: 5, right: 415, top: 192, bottom: 636 };
// Horizontal span of the markers + labels only (Maharashtra label to West Bengal label).
const LABEL_BOUNDS = { left: 14, right: 376 };
const CONTENT_CENTER_X = (CONTENT_BOUNDS.left + CONTENT_BOUNDS.right) / 2;
const CONTENT_CENTER_Y = (CONTENT_BOUNDS.top + CONTENT_BOUNDS.bottom) / 2;
const FIT_MARGIN_X = 16;
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

// Scale at which the whole content fits between the header and the discovery tip.
function computeFitScale(width: number, height: number, tipHeight: number) {
  const availableWidth = width - 2 * FIT_MARGIN_X;
  const availableHeight = height - tipHeight - HEADER_HEIGHT - 2 * FIT_GAP_Y;
  return Math.max(
    0.1,
    Math.min(
      MAX_FIT_SCALE,
      availableWidth / (CONTENT_BOUNDS.right - CONTENT_BOUNDS.left),
      availableHeight / (CONTENT_BOUNDS.bottom - CONTENT_BOUNDS.top),
    ),
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
      x: width / 2 - fit * CONTENT_CENTER_X,
      y: (HEADER_HEIGHT + visibleBottom) / 2 - fit * CONTENT_CENTER_Y,
    };
  }
  // Same for every state: zoom on top of the fit, keeping every label inside the side margins.
  const labelFit =
    (width / 2 - FIT_MARGIN_X) / Math.max(CONTENT_CENTER_X - LABEL_BOUNDS.left, LABEL_BOUNDS.right - CONTENT_CENTER_X);
  const scale = Math.min(fit * FOCUS_SCALE, Math.max(fit, labelFit));
  const visibleBottom = height - obstruction;
  const maxY = HEADER_HEIGHT + FIT_GAP_Y - scale * CONTENT_BOUNDS.top;
  const minY = visibleBottom - FOCUS_BOTTOM_GAP - scale * CONTENT_BOUNDS.bottom;
  return {
    scale,
    // X is the same for every state (and matches the default view), so the map only moves vertically.
    x: width / 2 - scale * CONTENT_CENTER_X,
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
          <div>
            <img src="/assets/93d0c.png" alt="" />
            <p>Tap on state to discover regional flavours</p>
          </div>
        </aside>
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
  const bannerCrop = bannerCardCrop(state.bannerWidth);
  const sheetDragRef = useRef<{ id: number; startY: number; startX: number; startTime: number; active: boolean } | null>(null);
  useReportHeight(sheetRef, onHeight);

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
        <div className="dish-carousel" role="list">
          {state.dishes.map((dish) => (
            <button
              className="dish-card"
              key={dish.name}
              role="listitem"
              style={dish.banner ? { background: bannerCrop.fillColor } : undefined}
              onClick={() => onSelectDish(dish)}
            >
              {/* The card shows the dish's banner (cropped to the dish); dishes without a banner keep their card image. */}
              <img src={dish.banner ?? dish.image} alt="" style={dish.banner ? cardCropStyle(bannerCrop) : undefined} />
              <span className="dish-gradient" />
              <span className="dish-copy">
                <strong>{dish.name}</strong>
                <span>{dish.description}</span>
                <small>Explore <b aria-hidden="true">→</b></small>
              </span>
            </button>
          ))}
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
    <section className="dish-detail-screen" aria-label={`${dish.name} collection`}>
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
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [markerPulse, setMarkerPulse] = useState(0);
  const [obstruction, setObstruction] = useState(0);
  const [tipHeight, setTipHeight] = useState(0);
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
  }, [selectedDish]);

  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [selected]);

  const selectState = (state: StateData) => {
    if (justDraggedRef.current) return;
    setSelected(state);
    setMarkerPulse((pulse) => pulse + 1);
  };

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedDish) setSelectedDish(null);
      else setSelected(null);
    };
    states.forEach((state) => {
      const illustration = new Image();
      illustration.src = state.illustration;
      illustration.decode?.().catch(() => undefined);
    });
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selectedDish]);

  const focus = computeMapFocus(shellSize.width, shellSize.height, obstruction, tipHeight, selected ? selected.marker : null);
  const bounds = computeMapPanBounds(shellSize.height, obstruction, focus.scale, focus.x, focus.y, !selected);
  const worldX = focus.x; // fixed for every state; bounds.minX === bounds.maxX
  const worldY = clamp(focus.y + pan.y, bounds.minY, bounds.maxY);
  const worldTransform = `translate(${worldX}px, ${worldY}px) scale(${focus.scale})`;

  const handleShellClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (!selected || justDraggedRef.current) return;
    if ((event.target as HTMLElement).closest(".bottom-sheet, .map-header, path, button")) return;
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

  if (selected && selectedDish) {
    return (
      <main className="app-shell">
        <DishDetail dish={selectedDish} state={selected} onBack={() => setSelectedDish(null)} />
      </main>
    );
  }

  return (
    <main ref={shellRef} className={`app-shell ${selected ? "is-selected" : ""}`} onClick={handleShellClick}>
      <div
        className="scene-transform"
        style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT, transform: worldTransform, transition: dragging ? "none" : undefined }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          className={`map-artwork map-world marker-pulse-${markerPulse % 2} ${selected ? `marker-${selected.name.toLowerCase().replace(/\s+/g, "-")}` : ""}`}
          aria-hidden="true"
        >
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
        <div className="target-layer">
          {states.map((state) => (
            <button
              key={state.name}
              style={state.target}
              onClick={() => selectState(state)}
              aria-label={`Open ${state.name} dishes from its marker or name`}
            />
          ))}
        </div>
        <div className="marker-hit-layer">
          {states.map((state) => (
            <button
              key={state.name}
              style={{
                left: `calc(50% + ${state.marker.x - 195}px)`,
                top: state.marker.y,
              }}
              onClick={() => selectState(state)}
              aria-label={`Select ${state.name} from its food marker`}
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

      {!selected && (
        <DiscoveryTip onHeight={handleTipHeight} />
      )}

      {selected && (
        <BottomSheet
          state={selected}
          onHeight={setObstruction}
          onClose={() => setSelected(null)}
          onSelectDish={setSelectedDish}
        />
      )}
    </main>
  );
}
