import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, type Variants } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1] as const;
export const VIEW = { once: true, amount: 0.2 } as const;

/** Parent that staggers its `item` children when it scrolls into view. */
export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
export const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
export const itemFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

type Tag = 'div' | 'ul' | 'section' | 'header' | 'span';

export function Stagger({ as = 'div', className, style, children, amount = VIEW.amount, gap = 0.09, delay = 0.04, id }: {
  as?: Tag; className?: string; style?: CSSProperties; children: ReactNode; amount?: number; gap?: number; delay?: number; id?: string;
}) {
  const M = motion[as];
  return (
    <M id={id} className={className} style={style} initial="hidden" whileInView="show" viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}>
      {children}
    </M>
  );
}

/** A child of <Stagger>. Also works stand-alone (reveals itself). */
export function Item({ as = 'div', className, style, children, fade, standalone }: {
  as?: Tag; className?: string; style?: CSSProperties; children?: ReactNode; fade?: boolean; standalone?: boolean;
}) {
  const M = motion[as];
  const own = standalone ? { initial: 'hidden', whileInView: 'show', viewport: VIEW } : {};
  return <M className={className} style={style} variants={fade ? itemFade : item} {...own}>{children}</M>;
}

/** True on devices with a precise pointer (mouse / trackpad). */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(hover: hover) and (pointer: fine)');
    setFine(mq.matches);
    const on = () => setFine(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return fine;
}

/** Pulls its child gently towards the cursor. Off for touch and reduced motion. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const on = fine && !reduce;
  return (
    <motion.span ref={ref} className={'magnetic' + (className ? ' ' + className : '')} style={on ? { x, y } : undefined}
      onPointerMove={on ? (e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      } : undefined}
      onPointerLeave={on ? () => { x.set(0); y.set(0); } : undefined}>
      {children}
    </motion.span>
  );
}

/** Number that counts up once it scrolls into view. */
export function Count({ to, dec = 0, duration = 1.6 }: { to: number; dec?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const c = animate(0, to, { duration, ease: EASE, onUpdate: (v) => { el.textContent = v.toFixed(dec); } });
    return () => c.stop();
  }, [inView, to, dec, duration]);
  return <span ref={ref} className="count">{(0).toFixed(dec)}</span>;
}
