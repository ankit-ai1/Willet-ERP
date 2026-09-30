import { useRef, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useMotionValue, useReducedMotion, useSpring, type Variants } from 'motion/react';
import { item, useFinePointer } from '@/lib/motion';

const MotionLink = motion.create(Link);
const MAX_TILT = 6;

/**
 * Glass card: gradient hairline border, subtle 3D tilt (≤ 6deg). The spotlight is driven by Layout's pointer handler.
 * Uses the `item` variant so it staggers in when placed inside <Stagger>.
 */
export function Card({ className, style, children, to, tilt = true, variants = item, onMouseEnter }: {
  className?: string; style?: CSSProperties; children: ReactNode; to?: string; tilt?: boolean; variants?: Variants; onMouseEnter?: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const canTilt = tilt && fine && !reduce;

  const move = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || !canTilt) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * MAX_TILT); rx.set(-(py - 0.5) * 2 * MAX_TILT);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  const common = {
    className: 'card' + (className ? ' ' + className : ''),
    variants,
    style: canTilt ? { ...style, rotateX: rx, rotateY: ry, transformPerspective: 1000 } : style,
    onPointerMove: move,
    onPointerLeave: leave,
    onMouseEnter,
  };
  if (to) return <MotionLink ref={(el: HTMLAnchorElement | null) => { ref.current = el; }} to={to} {...common}>{children}</MotionLink>;
  return <motion.div ref={(el: HTMLDivElement | null) => { ref.current = el; }} {...common}>{children}</motion.div>;
}
