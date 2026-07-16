import Link from "next/link";
import { RESERVATIONS_URL, PHONE, PHONE_URL } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menus", href: "/menus" },
  { label: "Reservations", href: RESERVATIONS_URL, external: true },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="bg-brand-bg border-t border-brand-cream px-6 md:px-10 py-10"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        <div className="flex items-start">
          <p className="font-literata text-[12px] text-brand-cream/60 leading-[1.5]">
            &copy; 2026 Reunion Cocktails + Provisions
          </p>
        </div>

        <div>
          <h3 className="font-servus font-normal text-[14px] text-brand-cream tracking-[0.06em] uppercase mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 list-none p-0 m-0">
            {NAV_LINKS.map(({ label, href, external }) => (
              <li key={label}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-literata text-[12px] text-brand-cream/70 hover:text-brand-cream transition-colors duration-200"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="font-literata text-[12px] text-brand-cream/70 hover:text-brand-cream transition-colors duration-200"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-servus font-normal text-[14px] text-brand-cream tracking-[0.06em] uppercase mb-4">
            Contact
          </h3>
          <div className="space-y-2">
            <p>
              <a
                href="mailto:manager@reunioncocktailsprovisions.com"
                className="font-literata text-[12px] text-brand-cream/70 hover:text-brand-cream transition-colors duration-200"
              >
                manager@reunion<wbr />cocktailsprovisions.com
              </a>
            </p>
            <p>
              <a
                href={PHONE_URL}
                className="font-literata text-[12px] text-brand-cream/70 hover:text-brand-cream transition-colors duration-200"
              >
                {PHONE}
              </a>
            </p>
            <p className="font-literata text-[12px] text-brand-cream/70">
              1201 W Chocolate Ave, Hummelstown, PA 17036
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
