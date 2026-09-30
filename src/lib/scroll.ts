import Lenis from 'lenis';

/** Smooth wheel scrolling (Lenis). Skipped entirely when the OS asks for reduced motion. */
let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ autoRaf: true, lerp: 0.11, smoothWheel: true });
  return () => { lenis?.destroy(); lenis = null; };
}

export function scrollToTop(smooth = false) {
  if (lenis) lenis.scrollTo(0, { immediate: !smooth, force: true });
  else window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop(); else lenis?.start();
  document.documentElement.classList.toggle('scroll-locked', locked);
}
