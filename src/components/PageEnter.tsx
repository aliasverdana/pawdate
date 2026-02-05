"use client";

import * as React from "react";
import { motion, type MotionProps } from "motion/react";

type PageEnterProps = {
  children: React.ReactNode;
  /**
   * Use when stacking multiple entering components; higher values enter later.
   */
  delayMs?: number;
} & Omit<MotionProps, "children">;

export function PageEnter({ children, delayMs = 0, ...props }: PageEnterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut", delay: delayMs / 1000 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
