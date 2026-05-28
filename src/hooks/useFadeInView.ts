"use client";

import { useInView } from "react-intersection-observer";
import { useAnimation, AnimationControls } from "framer-motion";
import { useEffect } from "react";

export function useFadeInView(threshold = 0.15): {
  ref: (node?: Element | null) => void;
  controls: AnimationControls;
  inView: boolean;
} {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return { ref, controls, inView };
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUpStaggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const fadeUpChildVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

