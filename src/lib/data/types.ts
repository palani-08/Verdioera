/** Keys for the built-in illustrated artwork (see components/media/product-art.tsx). */
export type ArtKey =
  | "paper-bags"
  | "tissue-products"
  | "hygiene-products"
  | "thermal-rolls"
  | "kitchen-rolls"
  | "biodegradable-cutlery"
  | "bagasse-tableware"
  | "edible-cutlery"
  | "paddy-husk-products"
  | "hero"
  | "about"
  | "manufacturing";

/**
 * A licensed photograph. Place files in /public/images and reference them here.
 * When `image` is omitted, the illustrated artwork for `art` is shown instead,
 * so the site never renders a broken image.
 */
export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Photographer / licence note kept for the content audit trail. */
  credit?: string;
};

export type Visual = {
  art: ArtKey;
  artAlt: string;
  image?: ImageAsset;
};
