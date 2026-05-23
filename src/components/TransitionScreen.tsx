"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LoadingOverlay } from "./LoadingScreen";

export default function TransitionScreen() {
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  const [active, setActive] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setKey((k) => k + 1);
    setActive(true);
  }, [pathname]);

  if (!active) return null;

  return (
    <LoadingOverlay
      key={key}
      scale={0.7}
      onHide={() => setActive(false)}
    />
  );
}
