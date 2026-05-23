"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FAQS = [
  { q: "What is Reunion?", a: "Reunion Cocktails & Provisions is a social dining experience in Hershey, PA centered around inspired dishes, handcrafted cocktails, and a space designed for connection." },
  { q: "What kind of experience should I expect?", a: "A warm, moody atmosphere perfect for evening dining, cocktails at the bar, or a full dinner with friends. The experience evolves throughout the night." },
  { q: "Do you have a bar?", a: "Yes. Our full-service bar features handcrafted cocktails, curated wines, and a thoughtful spirits program." },
  { q: "Can we just come for drinks?", a: "Absolutely. Walk-ins at the bar are always welcome." },
  { q: "Do you serve food at the bar?", a: "Yes, the full menu is available at the bar." },
  { q: "Do you take reservations?", a: "Yes. Reservations are strongly recommended, especially on weekends. Book via our reservations page." },
  { q: "Do you accept walk-ins?", a: "We do our best to accommodate walk-ins based on availability." },
  { q: "Do you take reservations for large parties?", a: "Yes. For parties of 8 or more, please contact us directly for private dining options." },
  { q: "Is your menu designed for sharing?", a: "Many of our plates are designed to be shared, encouraging a communal dining experience." },
  { q: "Is there a time limit on tables?", a: "We ask that parties be mindful during busy service, but we do not enforce strict time limits." },
  { q: "Do I need my full party to be seated?", a: "We prefer the full party before seating, but please call ahead if circumstances are unusual." },
  { q: "Is Reunion wheelchair accessible?", a: "Yes, our space is ADA accessible." },
  { q: "Do you have outdoor dining?", a: "Outdoor seating is seasonal. Check our social media for current availability." },
  { q: "Do you have onsite parking?", a: "Street parking is available nearby. A parking garage is located one block east." },
  { q: "What should I wear?", a: "Smart casual is the norm — we want you to feel comfortable and put-together." },
  { q: "Do you split checks?", a: "We can split checks up to 4 ways per table." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-brand-bg px-6 md:px-10 py-24 md:py-24" aria-labelledby="faq-heading">
      <div className="max-w-[900px] mx-auto">
        <motion.h2
          id="faq-heading"
          className="font-literata text-[clamp(1.5rem,4.5vw,2.5rem)] font-normal leading-[1.3] text-brand-cream mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Frequently Asked Questions
        </motion.h2>

        <dl>
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={q} className="border-b border-brand-cream/25">
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full flex items-center justify-between py-4 font-literata text-[15px] text-brand-cream text-left cursor-pointer hover:text-brand-cream/70 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-cream/40"
                  >
                    <span>{q}</span>
                    <span
                      className={`ml-4 flex-shrink-0 text-[11px] text-brand-cream/50 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${i}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
                >
                  <p className="font-literata text-[13px] text-brand-cream/65 leading-[1.7]">
                    {a}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
