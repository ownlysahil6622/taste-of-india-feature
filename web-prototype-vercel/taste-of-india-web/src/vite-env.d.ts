/// <reference types="vite/client" />

/** File names (e.g. "dal-makhni.png") in public/assets/cards/cutouts/, listed at build time. */
declare module "virtual:card-cutouts" {
  const files: string[];
  export default files;
}
