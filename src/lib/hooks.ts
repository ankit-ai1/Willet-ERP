import { useCallback, useEffect, useRef, useState } from 'react';

/** True once the element has scrolled into view (never flips back). */
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setInView(true); io.disconnect(); } }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin]);
  return [ref, inView] as const;
}

/** Width of an element, kept current with ResizeObserver. */
export function useWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setW(el.clientWidth);
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · Willet Enterprise Platform` : 'Willet Enterprise Platform — Order to cash to service, in one system';
  }, [title]);
}

type Theme = 'light' | 'dark';
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.getAttribute('data-theme') as Theme) || 'dark');
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('wep.site.theme', next); } catch { /* storage unavailable */ }
      const m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute('content', next === 'dark' ? '#060d18' : '#f5f7fb');
      return next;
    });
  }, []);
  return { theme, toggle };
}
