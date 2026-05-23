/**
 * Utilities de motion. Centralizan el respeto a prefers-reduced-motion y
 * exponen presets coherentes con los tokens (--ease-*, --dur-*).
 */

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const ease = {
  emphasized: [0.2, 0, 0, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  expressive: [0.65, 0, 0.35, 1] as const,
};

export const dur = {
  fast: 0.16,
  normal: 0.26,
  slow: 0.42,
  slower: 0.64,
  cinematic: 1.4,
} as const;

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px -10% 0px' },
  transition: { duration: dur.slower, ease: ease.outExpo },
};
