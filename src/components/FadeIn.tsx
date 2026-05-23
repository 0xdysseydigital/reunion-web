"use client";

import { motion } from "framer-motion";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  amount?: number;
};

export default function FadeIn({
  children,
  delay = 0,
  className,
  direction = "up",
  amount = 0.1,
}: FadeInProps) {
  const y = direction === "up" ? 28 : 0;
  const x = direction === "left" ? -28 : direction === "right" ? 28 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}
