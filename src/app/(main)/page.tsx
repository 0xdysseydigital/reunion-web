import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Info from "@/components/sections/Info";
import CC from "@/components/sections/CC";
import Spaces from "@/components/sections/Spaces";
import FAQ from "@/components/sections/FAQ";
import { getSiteSettings, resolveImage } from "@/lib/siteSettings";

export default async function HomePage() {
  const settings = await getSiteSettings();

  const spaceImages = {
    "drink-fare": resolveImage(settings?.spaceDrinkFareImage, 900),
    "the-lounge": resolveImage(settings?.spaceLoungeImage, 900),
    "the-den": resolveImage(settings?.spaceDenImage, 900),
    "the-library": resolveImage(settings?.spaceLibraryImage, 900),
    "the-atrium": resolveImage(settings?.spaceAtriumImage, 900),
    "the-garden": resolveImage(settings?.spaceGardenImage, 900),
  };

  return (
    <>
      <Hero imageUrl={resolveImage(settings?.heroImage, 1600)} />
      <About />
      <Info imageUrl={resolveImage(settings?.infoInteriorImage, 1200)} />
      <CC />
      <Spaces images={spaceImages} />
      <FAQ />
    </>
  );
}
