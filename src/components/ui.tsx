import { useId, useRef, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'motion/react';
import { appUrl, type AppKey } from '@/lib/config';
import { useToast } from '@/lib/toast';
import { EASE, Item, Magnetic, Stagger, VIEW, container } from '@/lib/motion';
import { Icon } from './Icon';

export { Count } from '@/lib/motion';

/** Button/link to the ERP or portal; shows a toast while the link is not configured. */
export function AppLink({ app, className, children, style }: { app: AppKey; className?: string; children: ReactNode; style?: CSSProperties }) {
  const toast = useToast();
  const url = appUrl(app);
  if (url) return <a className={className} style={style} href={url} target="_blank" rel="noopener">{children}</a>;
  return (
    <a className={className} style={style} href="#" onClick={(e) => { e.preventDefault(); toast(`${app === 'erp' ? 'ERP' : 'Portal'} link is not set yet — please check back shortly.`); }}>
      {children}
    </a>
  );
}

/** Arrow that slides on button hover. */
export const Arrow = () => <Icon name="arrow" className="arr" />;

/** Primary call-to-action pair used in the hero and CTA band. */
export function MainCtas({ size = 'lg' }: { size?: 'lg' | 'xl' }) {
  return (
    <div className="cta-row">
      <Magnetic><AppLink app="erp" className={`btn btn-primary btn-${size}`}><Icon name="monitor" />Sign in to ERP<Arrow /></AppLink></Magnetic>
      <Magnetic><AppLink app="portal" className={`btn btn-gold btn-${size}`}><Icon name="home" />Partner portal<Arrow /></AppLink></Magnetic>
    </div>
  );
}

/** Aurora mesh gradient + drifting grid + film grain. GPU-only (transform/opacity). */
export function Backdrop({ variant = 'hero' }: { variant?: 'hero' | 'page' | 'cta' }) {
  return (
    <div className={'backdrop bd-' + variant} aria-hidden="true">
      <div className="aurora"><i className="a1" /><i className="a2" /><i className="a3" /><i className="a4" /></div>
      <div className="grid-anim"><div /></div>
      <div className="noise" />
    </div>
  );
}

/** Left-aligned section heading with a large eyebrow number ("01 — Modules"). */
export function SectionHead({ n, eyebrow, title, sub, center }: { n?: string; eyebrow: string; title: ReactNode; sub?: ReactNode; center?: boolean }) {
  return (
    <Stagger as="header" className={'shead' + (center ? ' center' : '') + (sub ? '' : ' no-sub')}>
      <Item className="eyebrow">{n && <><span className="num">{n}</span><span className="rule" /></>}{eyebrow}</Item>
      <div className="shead-row">
        <Item><h2>{title}</h2></Item>
        {sub && <Item className="sub">{sub}</Item>}
      </div>
    </Stagger>
  );
}

/** Eyebrow for split layouts where the heading sits in a column. */
export function Eyebrow({ n, children }: { n?: string; children: ReactNode }) {
  return <Item className="eyebrow">{n && <><span className="num">{n}</span><span className="rule" /></>}{children}</Item>;
}

/** Screenshot that swaps to a dark variant in dark mode when one exists. */
export function ThemeImg({ light, dark, alt, w = 1440, h = 900, lazy }: { light: string; dark?: string; alt: string; w?: number; h?: number; lazy?: boolean }) {
  const loading = lazy ? 'lazy' : undefined;
  if (!dark) return <img src={`/assets/${light}.jpg`} alt={alt} width={w} height={h} loading={loading} decoding="async" />;
  return (
    <>
      <img className="theme-light-only" src={`/assets/${light}.jpg`} alt={alt} width={w} height={h} loading={loading} decoding="async" />
      <img className="theme-dark-only" src={`/assets/${dark}.jpg`} alt={alt} width={w} height={h} loading={loading} decoding="async" />
    </>
  );
}

export function Frame({ url, children, className }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={'frame' + (className ? ' ' + className : '')}>
      <div className="frame-bar"><i /><i /><i /><div className="url mono"><Icon name="lock" />{url}</div></div>
      <div className="frame-body">{children}</div>
    </div>
  );
}

/** Hero for inner pages: breadcrumbs, eyebrow, large headline, optional visual on the right. */
export function PageHero({ eyebrow, title, lead, crumbs, children, aside }: {
  eyebrow: string; title: ReactNode; lead?: ReactNode; crumbs?: [string, string?][]; children?: ReactNode; aside?: ReactNode;
}) {
  return (
    <header className={'page-hero' + (aside ? ' has-aside' : '')}>
      <Backdrop variant="page" />
      <div className="wrap ph-grid">
        <motion.div className="ph-main" initial="hidden" animate="show" variants={container}>
          {crumbs && (
            <Item><nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {crumbs.map(([label, to]) => (<span key={label}><span className="sep">/</span>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</span>))}
            </nav></Item>
          )}
          <Item className="eyebrow">{eyebrow}</Item>
          <Item><h1>{title}</h1></Item>
          {lead && <Item className="lead">{lead}</Item>}
          {children && <Item>{children}</Item>}
        </motion.div>
        {aside && (
          <motion.div className="ph-aside" initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, delay: 0.25, ease: EASE }}>
            {aside}
          </motion.div>
        )}
      </div>
    </header>
  );
}

/** Closing call-to-action with a slowly rotating conic-gradient border. */
export function Cta({ title = 'Step inside.', sub = 'Explore six months of live operations — dashboards, orders, production, service and the partner experience.' }: { title?: string; sub?: string }) {
  return (
    <section className="cta-sec">
      <div className="wrap">
        <motion.div className="cta" initial={{ opacity: 0, y: 40, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={VIEW} transition={{ duration: 1, ease: EASE }}>
          <div className="cta-ring" aria-hidden="true" />
          <div className="cta-inner">
            <Backdrop variant="cta" />
            <Stagger className="cta-grid">
              <div>
                <Item className="eyebrow">Ready when you are</Item>
                <Item><h2>{title}</h2></Item>
                <Item className="sub">{sub}</Item>
              </div>
              <Item className="cta-side"><MainCtas size="xl" /></Item>
            </Stagger>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="link-arrow">{children}<Arrow /></Link>;
}

/** Tiny trend line that draws itself in when visible. */
export function Sparkline({ values, color = 'var(--brand-2)', w = 140, h = 44, range, eager }: { values: number[]; color?: string; w?: number; h?: number; range?: [number, number]; eager?: boolean }) {
  const gid = 'sp' + useId().replace(/:/g, '');
  const [min, max] = range ?? [Math.min(...values), Math.max(...values)];
  const pad = 4;
  const X = (i: number) => pad + ((w - pad * 2) * i) / (values.length - 1);
  const Y = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const line = values.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${X(values.length - 1)} ${h} L${X(0)} ${h} Z`;
  const last = values.length - 1;
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const on = eager || seen;
  return (
    <svg ref={ref} className="spark" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".28" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <motion.path d={area} fill={`url(#${gid})`} initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 1, delay: 0.9 }} />
      <motion.path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1.6, ease: EASE, delay: 0.2 }} />
      <motion.circle cx={X(last)} cy={Y(values[last])} r={3.5} fill={color} initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 1.7 }} />
    </svg>
  );
}
