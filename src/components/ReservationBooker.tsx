"use client";

import { useEffect, useRef } from "react";

export default function ReservationBooker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";

    const script = document.createElement("script");
    script.id = "dine_script_tag_booker";
    script.src =
      "https://www.tbdine.com/inject/booker?format=1row&name=reunion-cocktails-provisions&idApp=68801&force=true&language=en-us";
    script.type = "text/javascript";

    wrapper.appendChild(script);
    el.appendChild(wrapper);
  }, []);

  return (
    <div className="w-full overflow-x-auto" ref={containerRef} />
  );
}
