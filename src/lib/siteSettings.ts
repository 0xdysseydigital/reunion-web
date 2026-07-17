import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  heroImage,
  infoInteriorImage,
  spaceDrinkFareImage,
  spaceLoungeImage,
  spaceDenImage,
  spaceLibraryImage,
  spaceAtriumImage,
  spaceGardenImage,
  menuHeroBrunchImage,
  menuHeroLunchImage,
  menuHeroDinnerImage,
  menuHeroBarImage,
  vibesGallery[]{
    image,
    alt,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height
  }
}`;

export type SiteSettings = {
  heroImage?: SanityImageSource;
  infoInteriorImage?: SanityImageSource;
  spaceDrinkFareImage?: SanityImageSource;
  spaceLoungeImage?: SanityImageSource;
  spaceDenImage?: SanityImageSource;
  spaceLibraryImage?: SanityImageSource;
  spaceAtriumImage?: SanityImageSource;
  spaceGardenImage?: SanityImageSource;
  menuHeroBrunchImage?: SanityImageSource;
  menuHeroLunchImage?: SanityImageSource;
  menuHeroDinnerImage?: SanityImageSource;
  menuHeroBarImage?: SanityImageSource;
  vibesGallery?: { image: SanityImageSource; alt?: string; width?: number; height?: number }[];
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return (
    (await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 30 } })) ?? null
  );
}

export function resolveImage(
  image: SanityImageSource | undefined | null,
  width?: number
): string | null {
  if (!image) return null;
  let builder = urlFor(image);
  if (width) builder = builder.width(width);
  return builder.auto("format").url();
}
