import type {
  TasteOfIndiaCardImageCrop,
  TasteOfIndiaState,
} from '../types';

const DEFAULT_DISH_DESCRIPTION =
  'A much-loved regional dish, layered with local spices and traditional flavours.';

// Punjab banners (587x510) reused as dish cards. Every Punjab banner has the
// dish centred at x≈294, ending by y≈352, with the banner's own text starting
// at y≈360: show x 143–446 from y 175 and cut off at y 356, filling the rest of
// the card with the banner's pale pink.
const PUNJAB_BANNER_CARD_CROP: TasteOfIndiaCardImageCrop = {
  sourceWidth: 587,
  sourceHeight: 510,
  x: 143,
  y: 175,
  width: 303,
  height: 181,
  fillColor: '#FFE8F3',
};

export const tasteOfIndiaStates: readonly TasteOfIndiaState[] = [
  {
    name: 'Punjab',
    illustrationKey: 'b54b9.png',
    selectedLayerKey: 'selected/31fce.svg',
    illustrationCrop: {
      top: '-23.08%',
      left: '0.06%',
      width: '99.88%',
      height: '144.23%',
    },
    hitboxPath: 'M94 235 132 232 135 272 116 287 92 266Z',
    target: { left: '35%', top: '30%', width: '14%', height: '3.5%' },
    markerAnchor: { x: 115, y: 266 },
    dishes: [
      {
        name: 'Amritsari Kulche',
        imageKey: 'banners/amritsari-kulche.png',
        bannerKey: 'banners/amritsari-kulche.png',
        description: DEFAULT_DISH_DESCRIPTION,
        cardImageCrop: PUNJAB_BANNER_CARD_CROP,
      },
      {
        name: 'Butter Chicken',
        imageKey: 'banners/butter-chicken.png',
        bannerKey: 'banners/butter-chicken.png',
        description: DEFAULT_DISH_DESCRIPTION,
        cardImageCrop: PUNJAB_BANNER_CARD_CROP,
      },
      {
        name: 'Chole Bhature',
        imageKey: 'banners/chole-bhature.png',
        bannerKey: 'banners/chole-bhature.png',
        description: DEFAULT_DISH_DESCRIPTION,
        cardImageCrop: PUNJAB_BANNER_CARD_CROP,
      },
      {
        name: 'Dal Makhni',
        imageKey: 'banners/dal-makhni.png',
        bannerKey: 'banners/dal-makhni.png',
        description: DEFAULT_DISH_DESCRIPTION,
        cardImageCrop: PUNJAB_BANNER_CARD_CROP,
      },
      {
        name: 'Lassi',
        imageKey: 'banners/lassi.png',
        bannerKey: 'banners/lassi.png',
        description: DEFAULT_DISH_DESCRIPTION,
        cardImageCrop: PUNJAB_BANNER_CARD_CROP,
      },
    ],
  },
  {
    name: 'Uttar Pradesh',
    illustrationKey: '16a3a.png',
    selectedLayerKey: 'selected/4c3cf.svg',
    hitboxPath: 'M139 292 211 284 231 319 204 350 146 339Z',
    target: { left: '52%', top: '38%', width: '18%', height: '3.5%' },
    markerAnchor: { x: 175, y: 330 },
    dishes: [
      {
        name: 'Gahloti Kebab',
        imageKey: 'cards/uttar-pradesh-gahloti-kebab.png',
        bannerKey: 'banners/gahloti-kebab.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Awadhi Biryani',
        imageKey: 'cards/uttar-pradesh-awadhi-biryani.png',
        bannerKey: 'banners/awadhi-biryani.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Nihari',
        imageKey: 'cards/uttar-pradesh-nihari.png',
        bannerKey: 'banners/nihari.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
    ],
  },
  {
    name: 'West Bengal',
    illustrationKey: 'e5130.png',
    selectedLayerKey: 'selected/9c924.svg',
    hitboxPath: 'M274 343 306 346 311 403 282 413 270 381Z',
    target: { left: '78%', top: '44%', width: '22%', height: '3.5%' },
    markerAnchor: { x: 288, y: 380 },
    dishes: [
      {
        name: 'Kosha Mangsho',
        imageKey: 'cards/west-bengal-kosha-mangsho.png',
        bannerKey: 'banners/kosha-mangsho.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Kolkata Biryani',
        imageKey: 'cards/west-bengal-kolkata-biryani.png',
        bannerKey: 'banners/kolkata-biryani.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Kathi Roll',
        imageKey: 'cards/west-bengal-kathi-roll.png',
        bannerKey: 'banners/kathi-roll.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Mishti Doi',
        imageKey: 'cards/west-bengal-mishti-doi.png',
        bannerKey: 'banners/_candidate-kathi-roll-1.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
    ],
  },
  {
    name: 'Maharashtra',
    illustrationKey: 'b1c0c.png',
    selectedLayerKey: 'selected/eb5f4.svg',
    illustrationCrop: {
      top: '-36.54%',
      left: '-3.09%',
      width: '106.17%',
      height: '165.38%',
    },
    hitboxPath: 'M67 387 129 391 142 442 115 474 74 455Z',
    target: { left: '0%', top: '49%', width: '21%', height: '3.5%' },
    markerAnchor: { x: 97, y: 426 },
    dishes: [
      {
        name: 'Vada Pav',
        imageKey: 'cards/maharashtra-vada-pav.png',
        bannerKey: 'banners/vada-pav.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Misal Pav',
        imageKey: 'cards/maharashtra-misal-pav.png',
        bannerKey: 'banners/misal-pav.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Pav Bhaaji',
        imageKey: 'cards/maharashtra-pav-bhaaji.png',
        bannerKey: 'banners/pav-bhaaji.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Puran Poli',
        imageKey: 'cards/maharashtra-puran-poli.png',
        bannerKey: 'banners/puran-poli.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Kolhapuri Mutton',
        imageKey: 'cards/maharashtra-kolhapuri-mutton.png',
        bannerKey: 'banners/kolhapuri-mutton.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
    ],
  },
  {
    name: 'Telangana',
    illustrationKey: '396c1.png',
    selectedLayerKey: 'selected/c8b9b.svg',
    hitboxPath: 'M137 415 184 414 195 454 176 477 143 463Z',
    target: { left: '45%', top: '52%', width: '18%', height: '3.5%' },
    markerAnchor: { x: 158, y: 454 },
    dishes: [
      {
        name: 'Hyderabadi Biryani',
        imageKey: 'cards/telangana-hyderabadi-biryani.png',
        bannerKey: 'banners/hyderabadi-biryani.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Haleem',
        imageKey: 'cards/telangana-haleem.png',
        bannerKey: 'banners/haleem.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Mirchi ka Salan',
        imageKey: 'cards/telangana-mirchi-ka-salan.png',
        bannerKey: 'banners/mirchi-ka-salan.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Double ka Meetha',
        imageKey: 'cards/telangana-double-ka-meetha.png',
        bannerKey: 'banners/double-ka-meetha.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Qubani ka Meetha',
        imageKey: 'cards/telangana-qubani-ka-meetha.png',
        bannerKey: 'banners/_candidate-double-ka-meetha-1.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
    ],
  },
  {
    name: 'Andhra Pradesh',
    illustrationKey: 'e6def.png',
    selectedLayerKey: 'selected/80e39.svg',
    hitboxPath: 'M164 465 215 456 220 505 181 526 158 501Z',
    target: { left: '50%', top: '58%', width: '23%', height: '3.5%' },
    markerAnchor: { x: 175, y: 500 },
    dishes: [
      {
        name: 'Andhra Meal',
        imageKey: 'cards/andhra-pradesh-andhra-meal.png',
        bannerKey: 'banners/andhra-meal.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Gongura Mutton',
        imageKey: 'cards/andhra-pradesh-gongura-mutton.png',
        bannerKey: 'banners/gongura-mutton.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Pesarattu Dish',
        imageKey: 'cards/andhra-pradesh-pesarattu-dish.png',
        bannerKey: 'banners/pesarattu-dish.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Guntur Chilli Chicken',
        imageKey: 'cards/andhra-pradesh-guntur-chilli-chicken.png',
        bannerKey: 'banners/guntur-chilli-chicken.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Ulavacharu Chicken Biryani',
        imageKey: 'cards/andhra-pradesh-ulavacharu-chicken-biryani.png',
        bannerKey: 'banners/ulavacharu-chicken-biryani.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Natu Kodi Pulusu',
        imageKey: 'cards/andhra-pradesh-natu-kodi-pulusu.png',
        bannerKey: 'banners/natu-kodi-pulusu.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
    ],
  },
  {
    name: 'Karnataka',
    illustrationKey: 'f1385.png',
    selectedLayerKey: 'selected/b6e0a.svg',
    hitboxPath: 'M78 458 128 457 145 523 121 550 91 519Z',
    target: { left: '4%', top: '59%', width: '20%', height: '3.5%' },
    markerAnchor: { x: 97, y: 507 },
    dishes: [
      {
        name: 'Benne Masala Dosa',
        imageKey: 'cards/karnataka-benne-masala-dosa.png',
        bannerKey: 'banners/benne-masala-dosa.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Bisi Bele Bath',
        imageKey: 'cards/karnataka-bisi-bele-bath.png',
        bannerKey: 'banners/bisi-bele-bath.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Donne Biryani',
        imageKey: 'cards/karnataka-donne-biryani.png',
        bannerKey: 'banners/donne-biryani.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Mangalorian Buns',
        imageKey: 'cards/karnataka-mangalorian-buns.png',
        bannerKey: 'banners/mangalorian-buns.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Kori Rotti',
        imageKey: 'cards/karnataka-kori-rotti.png',
        bannerKey: 'banners/kori-rotti.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
    ],
  },
  {
    name: 'Tamil Nadu',
    illustrationKey: '571a8.png',
    selectedLayerKey: 'selected/29bd1.svg',
    hitboxPath: 'M132 527 180 517 180 579 149 608 130 573Z',
    target: { left: '46%', top: '64%', width: '20%', height: '3.5%' },
    markerAnchor: { x: 158, y: 550 },
    dishes: [
      {
        name: 'Chetinad Chicken',
        imageKey: 'cards/tamil-nadu-chetinad-chicken.png',
        bannerKey: 'banners/chetinad-chicken.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Kothu Parotta',
        imageKey: 'cards/tamil-nadu-kothu-parotta.png',
        bannerKey: 'banners/kothu-parotta.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Pongal',
        imageKey: 'cards/tamil-nadu-pongal.png',
        bannerKey: 'banners/pongal.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Idli with Podi',
        imageKey: 'cards/tamil-nadu-idli-with-podi.png',
        bannerKey: 'banners/idli-with-podi.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Dindigul Biryani',
        imageKey: 'cards/tamil-nadu-dindigul-biryani.png',
        bannerKey: 'banners/dindigul-biryani.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Kari Dosa',
        imageKey: 'cards/tamil-nadu-kari-dosa.png',
        bannerKey: 'banners/kari-dosa.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
    ],
  },
  {
    name: 'Kerala',
    illustrationKey: 'a44f1.png',
    selectedLayerKey: 'selected/8fde0.svg',
    illustrationCrop: {
      top: '-24.53%',
      left: '5%',
      width: '90%',
      height: '141.51%',
    },
    hitboxPath: 'M98 542 122 541 133 608 117 643 102 600Z',
    target: { left: '13%', top: '69%', width: '15%', height: '3.5%' },
    markerAnchor: { x: 120, y: 594 },
    dishes: [
      {
        name: 'Appam with Stew',
        imageKey: 'cards/kerela-appam-with-stew.png',
        bannerKey: 'banners/appam-with-stew.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Malabar Biryani',
        imageKey: 'cards/kerela-malabar-biryani.png',
        bannerKey: 'banners/malabar-biryani.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Puttu & Kadala Curry',
        imageKey: 'cards/kerela-puttu-kadala-curry.png',
        bannerKey: 'banners/puttu-kadala-curry.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Kappa & Meen Curry',
        imageKey: 'cards/kerela-kappa-meen-curry.png',
        bannerKey: 'banners/kappa-meen-curry.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Karimeen Pollichathu',
        imageKey: 'cards/kerela-karimeen-pollichathu.png',
        bannerKey: 'banners/karimeen-pollichathu.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
      {
        name: 'Pazham Pori',
        imageKey: '89fe7.png',
        bannerKey: 'banners/pazham-pori.png',
        description: DEFAULT_DISH_DESCRIPTION,
      },
    ],
  },
];
