"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type ArchiveModalFrameProps = {
  children: ReactNode;
  className: string;
};

export function ArchiveModalFrame({
  children,
  className,
}: ArchiveModalFrameProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      aria-modal="true"
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 56 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
    >
      {children}
    </motion.article>
  );
}
