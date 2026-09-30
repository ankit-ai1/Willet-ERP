import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Icon, type IconName } from './Icon';
import { Card } from './Card';
import { AppLink, Arrow, Backdrop, Count, Eyebrow, Frame, MainCtas, Sparkline, ThemeImg } from './ui';
import { MODULES, type Module } from '@/data/modules';
import { DAYS, FAQ, INTEGRATIONS, KPIS, ORDERS, REVENUE, SLA, SYMPTOMS, TOUR } from '@/data/content';
import { EASE, Item, Stagger, VIEW } from '@/lib/motion';

const TONES = { green: ['rgba(52,211,153,.14)', 'var(--t-green)'], gold: ['rgba(232,163,61,.14)', 'var(--t-gold)'], blue: ['rgba(59,130,196,.16)', 'var(--t-blue)'], violet: ['rgba(167,139,250,.15)', 'var(--t-violet)'] } as const;
type Tone = keyof typeof TONES;

const ORDERS_CR = ORDERS.reduce((a, v) => a + v, 0) / 100;

/* ─────────── HERO ─────────── */
const L1 = ['One', 'system', 'from'];
const L2 = ['order', 'to', 'cash', 'to', 'service.'];

function Word({ w, i, grad }: { w: string; i: number; grad?: boolean }) {
  return (
    <>
      <motion.span className={'w' + (grad ? ' shimmer' : '')} style={{ '--si': i } as CSSProperties}
        initial={{ opacity: 0, y: 26, filter: 'blur(14px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
        transition={{ duration: 0.95, delay: 0.15 + i * 0.075, ease: EASE }}>
        {w}
      </motion.span>{' '}
    </>
  );
}

const fadeUp = (delay: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } });

export function Hero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sp } = useScroll({ target: stageRef, offset: ['start end', 'start 0.2'] });
  const { scrollYProgress: pp } = useScroll({ target: stageRef, offset: ['start end', 'end start'] });
  const k = reduce ? 0 : 1;
  const rotateX = useTransform(sp, [0, 1], [18 * k, 0]);
  // small, bounded drift so the cards stay anchored to the frame corners
  const yA = useTransform(pp, [0, 1], [24 * k, -24 * k]);
  const yC = useTransform(pp, [0, 1], [16 * k, -16 * k]);

  return (
    <section className="hero">
      <Backdrop variant="hero" />
      <div className="wrap hero-grid">
        <div className="hero-text">
          <motion.span className="pill" {...fadeUp(0.05)}><span className="dot" /> All plants online <b>Tally in sync</b></motion.span>
          <h1 className="hero-h1">
            {L1.map((w, i) => <Word key={i} w={w} i={i} />)}
            {L2.map((w, i) => <Word key={i} w={w} i={i + L1.length} grad />)}
          </h1>
          <motion.p className="lead" {...fadeUp(0.75)}>
            Supply chain, production, quality, field service, attendance and accounts — connected, traceable to the serial number, and reported to the MD every month without a single spreadsheet.
          </motion.p>
          <motion.div className="hero-actions" {...fadeUp(0.9)}>
            <MainCtas size="xl" />
            <div className="hero-meta">
              {['Laptop & mobile browser', 'Two-way Tally sync', 'WhatsApp & email built in', 'Data stays in India'].map((t) => <span key={t}><Icon name="check" />{t}</span>)}
            </div>
          </motion.div>
        </div>

        <div className="stage" ref={stageRef}>
          <motion.div className="stage-in" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6, ease: EASE }}>
            <motion.div className="stage-3d" style={{ rotateX, transformPerspective: 2200 }}>
              <div className="stage-glow" />
              <Frame url="erp.willet.in / dashboard" className="hero-frame"><ThemeImg light="dashboard" dark="dashboard-dark" alt="MD dashboard with revenue, margin, order book, OTIF, SLA and CSAT KPIs" /></Frame>
            </motion.div>
            <div className="phone hero-phone"><ThemeImg light="portal-mobile" dark="portal-mobile-dark" alt="Distributor portal on a phone" w={390} h={844} /></div>
            <motion.div className="float f1" style={{ y: yA }}>
              <GlassKpi icon="clock" tone="green" label="Within SLA" value={<><Count to={KPIS[1].value} dec={1} />%</>}><Sparkline values={SLA} color="var(--ok)" w={96} h={30} eager /></GlassKpi>
            </motion.div>
            <motion.div className="float f3" style={{ y: yC }}>
              <GlassKpi icon="sync" tone="gold" label="Tally first-time sync" value={<><Count to={KPIS[3].value} dec={1} />%</>} />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <TrustStrip />
      <Marquee />
    </section>
  );
}

function GlassKpi({ icon, tone, label, value, children }: { icon: IconName; tone: Tone; label: string; value: ReactNode; children?: ReactNode }) {
  return (
    <div className="glass-kpi">
      <div className="gk-top">
        <span className="gk-ico" style={{ background: TONES[tone][0], color: TONES[tone][1] }}><Icon name={icon} /></span>
        <span className="gk-label">{label}</span>
      </div>
      <div className="gk-row"><b>{value}</b>{children}</div>
    </div>
  );
}

const DEPTS: [IconName, string][] = [['chart', 'MD office'], ['cart', 'Sales'], ['box', 'Stores'], ['factory', 'Production'], ['shield', 'Quality'], ['headset', 'Service'], ['cal', 'HR'], ['receipt', 'Accounts']];

export function TrustStrip() {
  return (
    <Stagger className="wrap trust" gap={0.05}>
      <Item className="trust-label">Trusted by every department — from the shop floor to the MD's office</Item>
      <div className="trust-row">
        {DEPTS.map(([ic, t]) => <Item key={t} className="trust-logo"><Icon name={ic} />{t}</Item>)}
      </div>
    </Stagger>
  );
}

export function Marquee() {
  const items = ['GST e-invoice & e-way bill', 'Credit check & hold', 'Batch & serial genealogy', 'Work orders & scrap', 'Incoming & final QC', 'SLA clocks', 'Engineer "My day"', 'Geo-fenced attendance', 'Two-way Tally', 'WhatsApp inbox', 'Signed monthly packs', 'MFA & audit log'];
  return (
    <div className="marquee" aria-label="Capabilities">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <ul key={k} aria-hidden={k === 1}>{items.map((t) => <li key={t}>{t}</li>)}</ul>
        ))}
      </div>
    </div>
  );
}

/* ─────────── IMPACT BAND ─────────── */
function Ring({ value }: { value: number }) {
  return (
    <svg className="ring" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <circle cx="24" cy="24" r="19" className="ring-bg" />
      <motion.circle cx="24" cy="24" r="19" className="ring-fg" initial={{ pathLength: 0 }} whileInView={{ pathLength: value / 100 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: EASE, delay: 0.2 }} />
    </svg>
  );
}

export function ImpactBand() {
  const items: { label: string; pre?: string; val: number; dec: number; suf: string; note: string; spark?: number[]; color?: string }[] = [
    { label: 'Orders booked', pre: '₹', val: ORDERS_CR, dec: 2, suf: 'Cr', note: 'Apr – Sep, across every channel', spark: ORDERS, color: 'var(--s1)' },
    { label: 'Revenue invoiced', pre: '₹', val: KPIS[0].value, dec: 2, suf: 'Cr', note: 'GST-ready, posted to Tally', spark: REVENUE, color: 'var(--gold)' },
    { label: 'Complaints within SLA', val: KPIS[1].value, dec: 1, suf: '%', note: 'up from 87% in April', spark: SLA, color: 'var(--ok)' },
    { label: 'Tally first-time sync', val: KPIS[3].value, dec: 1, suf: '%', note: 'vouchers posted without a fix' },
  ];
  const scale: [number, string, string][] = [[12, '', 'connected modules'], [118, '+', 'role-aware screens'], [7, '', 'signed monthly packs'], [6, ' mo', 'of operations to explore']];
  return (
    <div className="impact">
      <Stagger className="impact-grid">
        {items.map((it) => (
          <Item key={it.label} className="impact-cell">
            <span className="impact-label">{it.label}</span>
            <b className="impact-num">{it.pre}<Count to={it.val} dec={it.dec} /><small>{it.suf}</small></b>
            <div className="impact-foot">
              <span>{it.note}</span>
              {it.spark ? <Sparkline values={it.spark} color={it.color} /> : <Ring value={it.val} />}
            </div>
          </Item>
        ))}
      </Stagger>
      <Stagger className="scale-row" gap={0.06}>
        {scale.map(([n, suf, l]) => <Item key={l}><b><Count to={n} />{suf}</b><span>{l}</span></Item>)}
      </Stagger>
    </div>
  );
}

/* ─────────── BEFORE / AFTER ─────────── */
export function BeforeAfter() {
  const before: [string, string][] = [['Orders re-typed', ' from WhatsApp into Excel, then into Tally — mistakes found at month-end.'], ['Stock is a guess', ' until someone walks the store; dispatch promises are made blind.'], ['Complaints live in call logs', ' — no SLA, no link to the batch that caused them.'], ['The MD waits for reports', ' assembled by hand in the second week of the month.']];
  const after: [string, string][] = [['Orders enter once', ' — from the portal or sales team — with credit checked on the spot.'], ['Live stock by batch and serial', ', reserved the moment an order is confirmed.'], ['Every complaint on an SLA clock', ', routed by PIN code, traced back to its production batch.'], ['Month-end packs are signed and sent', ' automatically, the day books close.']];
  return (
    <Stagger className="ba">
      <Card className="ba-card ba-before" tilt={false}>
        <h3><span className="tag">Before</span> Every department, its own copy</h3>
        <ul>{before.map(([b, t]) => <li key={b}><Icon name="x" /><span><b>{b}</b>{t}</span></li>)}</ul>
      </Card>
      <Card className="ba-card ba-after" tilt={false}>
        <h3><span className="tag">After</span> One connected platform</h3>
        <ul>{after.map(([b, t]) => <li key={b}><Icon name="check" /><span><b>{b}</b>{t}</span></li>)}</ul>
      </Card>
    </Stagger>
  );
}

/* ─────────── LOGIN DOORS ─────────── */
export function Doors() {
  const doors = [
    { cls: 'staff', icon: 'grid' as IconName, title: 'Staff ERP', text: 'For the MD, sales, stores, production, quality, service, HR and accounts.', app: 'erp' as const, btn: 'btn-primary', label: 'Sign in to ERP',
      checks: ['MD dashboard, approvals inbox and exception alerts', 'Orders, purchase, stock, work orders and QC', 'Complaints with SLA, engineer "My day" on mobile', 'Attendance, leave, Tally sync and monthly packs'] },
    { cls: 'partner', icon: 'users' as IconName, title: 'Partner Portal', text: 'For customers and distributors — self-service, 24×7, on any phone.', app: 'portal' as const, btn: 'btn-gold', label: 'Open partner portal',
      checks: ['Order from your own price list, see credit available', 'Track dispatch with LR & vehicle, download invoices', 'Statement of account with ageing', 'Raise complaints with photos, follow the engineer visit'] },
  ];
  return (
    <Stagger className="doors">
      {doors.map((d) => (
        <Card key={d.cls} className={'door ' + d.cls} tilt={false}>
          <div className="door-ico"><Icon name={d.icon} /></div>
          <h3>{d.title}</h3>
          <p>{d.text}</p>
          <ul className="checks">{d.checks.map((t) => <li key={t}><Icon name="check" />{t}</li>)}</ul>
          <AppLink app={d.app} className={`btn ${d.btn} btn-lg btn-block`}>{d.label}<Arrow /></AppLink>
          <p className="door-note"><Icon name="key" />Use the credentials shared by your administrator.</p>
        </Card>
      ))}
    </Stagger>
  );
}

/* ─────────── KPI CARDS ─────────── */
const KPI_SPARK: (number[] | undefined)[] = [REVENUE, SLA, undefined, undefined];

export function KpiGrid() {
  return (
    <Stagger className="grid-4 kpis">
      {KPIS.map((k, i) => (
        <Card key={k.label} className="kpi">
          <div className="k-top">{k.label} <span className="k-ico"><Icon name={k.icon} /></span></div>
          <div className="k-val">{k.prefix}<Count to={k.value} dec={k.dec} />{k.suffix && <small className="k-suf">{k.suffix}</small>}</div>
          <div className="k-note">{k.delta && <span className="delta"><Icon name="up" />{k.delta}</span>} {k.note}</div>
          {KPI_SPARK[i] ? <Sparkline values={KPI_SPARK[i]!} w={220} h={40} color={i === 1 ? 'var(--ok)' : 'var(--gold)'} />
            : <div className="meter"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: k.meter / 100 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE, delay: 0.3 }} /></div>}
        </Card>
      ))}
    </Stagger>
  );
}

/* ─────────── MODULES: BENTO (home) ─────────── */
type BentoVis = 'shot' | 'chart' | 'ring' | 'matrix' | 'bars';
const BENTO: Record<string, [string, BentoVis?]> = {
  sales: ['b-hero', 'shot'], 'md-dashboard': ['b-wide', 'chart'], inventory: ['b-sq'], production: ['b-sq'], service: ['b-sq', 'bars'],
  people: ['b-sq'], 'accounts-tally': ['b-wide', 'ring'], approvals: ['b-wide', 'shot'], 'access-control': ['b-wide', 'matrix'],
};

function BentoVisual({ m, vis }: { m: Module; vis: BentoVis }) {
  if (vis === 'shot') return <div className="bento-shot"><img src={`/assets/${m.img}.jpg`} alt="" loading="lazy" decoding="async" width={1440} height={900} /></div>;
  if (vis === 'chart') return <div className="bento-chart"><Sparkline values={ORDERS} color="var(--s1)" w={360} h={96} range={[40, 110]} /><Sparkline values={REVENUE} color="var(--gold)" w={360} h={96} range={[40, 110]} /></div>;
  if (vis === 'ring') return (
    <div className="bento-ring"><Ring value={KPIS[3].value} /><div><b><Count to={KPIS[3].value} dec={1} />%</b><span>first-time sync</span></div><Icon name="sync" className="spin-slow" /></div>
  );
  if (vis === 'bars') {
    const max = SYMPTOMS[0][1];
    return (
      <div className="bento-bars" aria-hidden="true">
        {SYMPTOMS.map(([s, v], i) => <motion.i key={s} style={{ height: `${(v / max) * 100}%` }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: EASE }} />)}
      </div>
    );
  }
  const on = [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0];
  return (
    <div className="bento-matrix" aria-hidden="true">
      {on.map((v, i) => <motion.i key={i} className={v ? 'on' : ''} initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 + (i % 6) * 0.05 + Math.floor(i / 6) * 0.08 }} />)}
    </div>
  );
}

export function BentoModules() {
  return (
    <Stagger className="bento" amount={0.1} gap={0.07}>
      {MODULES.map((m) => {
        const [size, vis] = BENTO[m.slug] ?? ['b-sq'];
        return (
          <Card key={m.slug} to={`/modules/${m.slug}`} className={'bento-card ' + size + (vis ? ' has-vis vis-' + vis : '')}>
            <div className="bento-text">
              <span className="mi"><Icon name={m.icon} /></span>
              <h4>{m.title}</h4>
              <small className="bento-short">{m.short}</small>
              <p>{m.desc}</p>
              <span className="more">Learn more<Arrow /></span>
            </div>
            {vis && <BentoVisual m={m} vis={vis} />}
          </Card>
        );
      })}
    </Stagger>
  );
}

/* ─────────── MODULE EXPLORER (/modules) ─────────── */
export function ModuleExplorer() {
  const [idx, setIdx] = useState(0);
  const [user, setUser] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -30% 0px' });
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const auto = inView && !user && !reduce;
  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % MODULES.length), 7000);
    return () => clearTimeout(t);
  }, [auto, idx]);
  useEffect(() => {
    const list = listRef.current; const btn = list?.children[idx] as HTMLElement | undefined;
    if (list && btn && list.scrollWidth > list.clientWidth) list.scrollTo({ left: btn.offsetLeft - 20, behavior: 'smooth' });
  }, [idx]);
  const m = MODULES[idx];
  return (
    <motion.div className="explorer" ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.9, ease: EASE }}>
      <div className="ex-list" role="tablist" aria-label="Modules" ref={listRef}>
        {MODULES.map((mod, i) => (
          <button key={mod.slug} className="ex-btn" role="tab" aria-selected={i === idx} onClick={() => { setUser(true); setIdx(i); }}>
            {i === idx && <motion.span layoutId="ex-pill" className="ex-pill" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
            <span className="mi"><Icon name={mod.icon} /></span>
            <span className="ex-t">{mod.title}<small>{mod.short}</small></span>
            <i key={`${idx}-${auto}`} className={'tm' + (auto && i === idx ? ' run' : '')} />
          </button>
        ))}
      </div>
      <div className="ex-panel card" onMouseEnter={() => setUser(true)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={m.slug} className="xin" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
            <div className="ex-head">
              <div>
                <h3>{m.title}</h3>
                <p className="xd">{m.desc}</p>
              </div>
              <div className="ex-metrics">{m.metrics.slice(0, 2).map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>
            </div>
            <div className="ex-body">
              <ul className="ex-feats">{m.features.map(([f]) => <li key={f}><Icon name="check" />{f}</li>)}</ul>
              <Frame url={m.url}><img src={`/assets/${m.img}.jpg`} alt={`${m.title} screen`} width={1440} height={900} loading="lazy" decoding="async" /></Frame>
            </div>
            <Link className="link-arrow" to={`/modules/${m.slug}`}>Explore {m.title} in detail<Arrow /></Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function ModuleCards({ exclude }: { exclude?: string }) {
  const list = MODULES.filter((m) => m.slug !== exclude);
  return (
    <Stagger className="grid-auto mgrid" amount={0.1} gap={0.06}>
      {list.map((m) => (
        <Card key={m.slug} to={`/modules/${m.slug}`} className="mcard">
          <span className="mi"><Icon name={m.icon} /></span>
          <h4>{m.title}</h4>
          <p>{m.desc}</p>
          <span className="more">Learn more<Arrow /></span>
        </Card>
      ))}
    </Stagger>
  );
}

/* ─────────── FLOW: sticky scroll story ─────────── */
const STEPS: { icon: IconName; t: string; p: string; d: string; shot: string; url: string }[] = [
  { icon: 'cart', t: 'Order', p: 'Portal or sales team, credit checked', d: 'A distributor orders from the portal at night, or sales keys it from a quote. Credit limit and overdue dues are checked the moment it is saved.', shot: 'portal-order', url: 'partners.willet.in / orders / new' },
  { icon: 'factory', t: 'Make', p: 'Stock reserved or work order raised', d: 'Available stock is reserved by batch and serial. Anything short becomes a work order, and missing material becomes a purchase requisition.', shot: 'work-orders', url: 'erp.willet.in / production / work-orders' },
  { icon: 'shield', t: 'Inspect', p: 'QC passes each serial number', d: 'Final inspection gates every finished serial before it becomes available to sell — the result stays on the serial for life.', shot: 'stock', url: 'erp.willet.in / inventory / stock' },
  { icon: 'truck', t: 'Dispatch', p: 'E-invoice, e-way bill, WhatsApp update', d: 'IRN, QR and e-way bill are generated at dispatch, and the customer gets a WhatsApp message with vehicle and LR number.', shot: 'sales', url: 'erp.willet.in / sales / orders' },
  { icon: 'receipt', t: 'Account', p: 'Voucher lands in Tally automatically', d: 'The invoice queues for Tally with a unique ID and posts through the agent on the accounts PC. Payments flow back and update credit.', shot: 'tally', url: 'erp.willet.in / accounts / tally' },
  { icon: 'headset', t: 'Serve', p: 'Complaint by serial, engineer on SLA', d: 'A complaint is logged against the serial, routed by PIN code to the right engineer and tracked on an SLA clock until the customer signs off.', shot: 'cases', url: 'erp.willet.in / service / cases' },
];

function StoryStep({ i, active, onActive, s }: { i: number; active: boolean; onActive: (i: number) => void; s: (typeof STEPS)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);
  return (
    <li ref={ref} className={'story-step' + (active ? ' active' : '')}>
      <div className="ss-num"><span>{String(i + 1).padStart(2, '0')}</span><Icon name={s.icon} /></div>
      <div className="ss-body">
        <h3>{s.t}</h3>
        <p className="ss-p">{s.p}</p>
        <p className="ss-d">{s.d}</p>
        <div className="ss-shot"><Frame url={s.url}><img src={`/assets/${s.shot}.jpg`} alt={`${s.t} step screen`} loading="lazy" decoding="async" width={1440} height={900} /></Frame></div>
      </div>
    </li>
  );
}

export function FlowStory({ n, title, sub }: { n: string; title: ReactNode; sub: ReactNode }) {
  const [active, setActive] = useState(0);
  const s = STEPS[active];
  return (
    <div className="story">
      <div className="story-pin">
        <div className="story-sticky">
          <Stagger>
            <Eyebrow n={n}>How it flows</Eyebrow>
            <Item><h2>{title}</h2></Item>
            <Item className="sub">{sub}</Item>
          </Stagger>
          <div className="story-progress" aria-hidden="true">
            {STEPS.map((x, i) => <span key={x.t} className={i === active ? 'on' : i < active ? 'done' : ''}><i />{x.t}</span>)}
          </div>
          <div className="story-visual">
            <Frame url={s.url}>
              <div className="xfade">
                <AnimatePresence initial={false}>
                  <motion.img key={s.shot} src={`/assets/${s.shot}.jpg`} alt={`${s.t} step screen`} width={1440} height={900}
                    initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} />
                </AnimatePresence>
              </div>
            </Frame>
          </div>
        </div>
      </div>
      <ol className="story-steps">
        {STEPS.map((x, i) => <StoryStep key={x.t} i={i} s={x} active={i === active} onActive={setActive} />)}
      </ol>
    </div>
  );
}

/* ─────────── TOUR ─────────── */
export function Tour() {
  const [i, setI] = useState(0);
  const t = TOUR[i];
  return (
    <div className="tour">
      <Stagger className="tour-tabs" as="div" gap={0.05}>
        <div role="tablist" aria-label="Screens" className="tour-list">
          {TOUR.map((x, j) => (
            <Item key={x.shot}>
              <button className="tour-tab" role="tab" aria-selected={i === j} onClick={() => setI(j)}>
                {i === j && <motion.span layoutId="tour-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="tt-n">{String(j + 1).padStart(2, '0')}</span>{x.label}
              </button>
            </Item>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={t.shot} className="show-cap" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>{t.cap}</motion.p>
        </AnimatePresence>
      </Stagger>
      <motion.div className="tour-stage" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 1, ease: EASE }}>
        <div className="stage-glow" />
        <Frame url={t.url}>
          <div className="xfade">
            <AnimatePresence initial={false}>
              <motion.img key={t.shot} src={`/assets/${t.shot}.jpg`} alt={t.label} width={1440} height={900}
                initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: EASE }} />
            </AnimatePresence>
          </div>
        </Frame>
      </motion.div>
    </div>
  );
}

/* ─────────── A DAY ON THE PLATFORM ─────────── */
export function DayTimeline() {
  const [i, setI] = useState(0);
  return (
    <div className="day">
      <Stagger className="roles" gap={0.05}>
        <div role="tablist" aria-label="Roles" className="roles-list">
          {DAYS.map((dd, j) => (
            <Item key={dd.role}>
              <button className="role" role="tab" aria-selected={i === j} onClick={() => setI(j)}>
                {i === j && <motion.span layoutId="role-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="av">{dd.initials}</span>{dd.role}
              </button>
            </Item>
          ))}
        </div>
      </Stagger>
      <AnimatePresence mode="wait">
        <motion.ol key={i} className="timeline" initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.2 } }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
          {DAYS[i].items.map(([time, title, text, chip]) => (
            <motion.li className="tl" key={title} variants={{ hidden: { opacity: 0, x: -18 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}>
              <time>{time}</time><span className="nd" />
              <div className="bx card"><b>{title}</b><span>{text}</span><span className="chip">{chip}</span></div>
            </motion.li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}

/* ─────────── MOBILE ─────────── */
export function Phones() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const k = reduce ? 0 : 1;
  const y1 = useTransform(scrollYProgress, [0, 1], [60 * k, -60 * k]);
  const y2 = useTransform(scrollYProgress, [0, 1], [140 * k, -120 * k]);
  return (
    <motion.div className="phones" ref={ref} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VIEW} transition={{ duration: 1, ease: EASE }}>
      <div className="ring-glow" />
      <motion.div className="phone p1" style={{ y: y1 }}><ThemeImg light="dash-mobile" dark="dash-mobile-dark" alt="ERP dashboard on a phone" w={390} h={844} lazy /></motion.div>
      <motion.div className="phone p2" style={{ y: y2 }}><ThemeImg light="portal-mobile" dark="portal-mobile-dark" alt="Partner portal on a phone" w={390} h={844} lazy /></motion.div>
    </motion.div>
  );
}

export function FeatureRows({ items }: { items: [IconName, string, string][] }) {
  return (
    <Stagger className="mfeats" gap={0.08}>
      {items.map(([ic, b, s]) => <Card key={b} className="mfeat"><div className="mi"><Icon name={ic} /></div><div><b>{b}</b><span>{s}</span></div></Card>)}
    </Stagger>
  );
}

/** Generic icon-feature grid (4 / 3 / 2 / 1 columns). */
export function FeatureGrid({ items, check }: { items: [IconName, string, string][]; check?: boolean }) {
  return (
    <Stagger className={`grid-auto feat-grid n-${items.length}`} amount={0.1} gap={0.07}>
      {items.map(([ic, t, p]) => <Card key={t} className="feat"><span className="mi"><Icon name={check ? 'check' : ic} /></span><h4>{t}</h4><p>{p}</p></Card>)}
    </Stagger>
  );
}

/** Numbered steps (Tally, engineer visit, sign-in). */
export function StepCards({ steps }: { steps: [string, string][] }) {
  return (
    <Stagger className={`grid-auto steps n-${steps.length}`} gap={0.08}>
      {steps.map(([t, p], i) => <Card key={t} className="step-card"><span className="num">{String(i + 1).padStart(2, '0')}</span><h4>{t}</h4><p>{p}</p></Card>)}
    </Stagger>
  );
}

/* ─────────── INTEGRATIONS ─────────── */
export function IntegrationGrid({ limit }: { limit?: number }) {
  return (
    <Stagger className={`grid-auto ints n-${INTEGRATIONS.slice(0, limit).length}`} amount={0.1} gap={0.07}>
      {INTEGRATIONS.slice(0, limit).map((x) => (
        <Card key={x.title} className="int">
          <div className="ii" style={{ background: TONES[x.tone][0], color: TONES[x.tone][1] }}>{x.mark}</div>
          <div><h4>{x.title} <span className={'status ' + x.status}>{x.status === 'live' ? 'Live' : 'Ready'}</span></h4><p>{x.text}</p></div>
        </Card>
      ))}
    </Stagger>
  );
}

/* ─────────── TESTIMONIALS ─────────── */
const QUOTES: [string, string, string][] = [
  ['I see every open order, every credit hold and every SLA risk before my first meeting. I stopped asking people for reports.', 'Managing Director', 'industrial equipment'],
  ['Month-end used to mean ten days of matching Excel against Tally. Now the pack is signed and out the day the books close.', 'CFO', 'engineered products'],
  ['Every complaint has a clock, an engineer and a serial number — and we can trace it back to the batch that caused it.', 'Service Head', 'pumps & fluid systems'],
  ['Stock by batch and serial, including the engineer vans. Cycle counts replaced our annual shutdown count.', 'Plant Head', 'manufacturing'],
  ['Distributors order from their phones at night. By morning the orders are credit-checked and nobody re-types anything.', 'Sales Head', 'distribution network'],
];

export function Testimonials() {
  return (
    <>
      <Stagger className="quotes" amount={0.1} gap={0.08}>
        {QUOTES.map(([q, role, org], i) => (
          <Card key={role} className={'quote' + (i === 0 ? ' featured' : '')}>
            <svg className="qmark" viewBox="0 0 32 24" aria-hidden="true"><path d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12z" /></svg>
            <blockquote>{q}</blockquote>
            <figcaption><span className="av">{role.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span><span><b>{role}</b><small>{org}</small></span></figcaption>
          </Card>
        ))}
      </Stagger>
      <p className="fine-print">Illustrative feedback by role — no individual or company is named.</p>
    </>
  );
}

/* ─────────── ARCHITECTURE ─────────── */
export function Architecture() {
  const node = (x: number, y: number, w: number, h: number, t: string, s: string[], cls = '') => (
    <g className={'nd ' + cls}><rect x={x} y={y} width={w} height={h} rx={12} /><text x={x + 16} y={y + 22}>{t}</text>{s.map((l, i) => <text key={l} className="s" x={x + 16} y={y + 39 + i * 15}>{l}</text>)}</g>
  );
  const wires: [string, string][] = [['w1', 'M190 105 C 230 105, 240 200, 290 200'], ['w2', 'M190 200 L 290 200'], ['w3', 'M190 295 C 230 295, 240 200, 290 200'], ['w4', 'M420 200 L 470 200'], ['w5', 'M600 185 C 630 185, 630 105, 650 105'], ['w6', 'M600 215 C 630 215, 630 295, 650 295'], ['w7', 'M730 105 L 810 105'], ['w8', 'M730 295 L 810 295'], ['w9', 'M810 200 L 600 200']];
  const pk: [string, string, string, boolean][] = [['w1', '2.4s', '0s', false], ['w2', '2s', '.4s', true], ['w3', '2.6s', '.8s', false], ['w4', '1.2s', '0s', false], ['w5', '1.8s', '.3s', false], ['w6', '1.8s', '.9s', true], ['w7', '1.6s', '.5s', true], ['w8', '1.6s', '1s', true], ['w9', '2.2s', '.2s', false]];
  return (
    <motion.div className="arch card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 0.9, ease: EASE }}>
      <svg viewBox="0 0 1000 400" role="img" aria-label="Architecture: browsers connect through NGINX to the API; the API uses PostgreSQL and Redis; a worker sends WhatsApp and email; the Tally agent and device gateway connect Tally and biometric terminals.">
        <rect className="zone" x={10} y={20} width={200} height={360} rx={16} /><text className="zl" x={30} y={46}>USERS</text>
        <rect className="zone" x={250} y={20} width={500} height={360} rx={16} /><text className="zl" x={270} y={46}>YOUR SERVER</text>
        <rect className="zone" x={790} y={20} width={200} height={360} rx={16} /><text className="zl" x={810} y={46}>CONNECTED</text>
        {wires.map(([id, p]) => <path key={id} id={id} className="wire" d={p} />)}
        {node(30, 80, 160, 50, 'Staff ERP', ['laptop & phone'])}
        {node(30, 175, 160, 50, 'Partner portal', ['customers, distributors'], 'gd')}
        {node(30, 270, 160, 50, 'Engineers', ['"My day" on mobile'])}
        {node(290, 172, 130, 56, 'NGINX', ['HTTPS gateway'])}
        {node(470, 165, 130, 70, 'API', ['NestJS · rules,', 'approvals, audit'], 'hl')}
        {node(650, 80, 80, 50, 'DB', ['Postgres'])}
        {node(650, 270, 80, 50, 'Worker', ['SLA, jobs'])}
        {node(290, 300, 130, 50, 'Backups', ['nightly, encrypted'])}
        {node(290, 70, 130, 50, 'Redis', ['cache, queues'])}
        {node(810, 80, 160, 50, 'Tally Prime', ['via Tally agent'])}
        {node(810, 175, 160, 50, 'Biometric', ['ZKTeco / eSSL gateway'])}
        {node(810, 270, 160, 50, 'WhatsApp · Email', ['GST e-invoice (GSP)'])}
        {pk.map(([id, dur, begin, gold]) => (
          <circle key={id} className={'pkt' + (gold ? ' g' : '')} r={4}>
            <animateMotion dur={dur} begin={begin} repeatCount="indefinite"><mpath href={`#${id}`} /></animateMotion>
          </circle>
        ))}
      </svg>
    </motion.div>
  );
}

/* ─────────── SECURITY LIST ─────────── */
export function SecurityList() {
  const items: [IconName, string, string][] = [['lock', 'Role-based access with data scope', 'By company, location, territory, team or self — plus dual approval for sensitive roles.'], ['phone', 'Two-factor sign-in', 'Authenticator app with recovery codes; required for finance and admin roles.'], ['file', 'Complete audit trail', 'Who changed what, when, from where — with before and after values.'], ['globe', 'Data stays in India', 'On-premise deployment with nightly encrypted backups.']];
  return (
    <Stagger className="sec-list" gap={0.08}>
      {items.map(([ic, b, s]) => <Card key={b} className="sec"><span className="mi"><Icon name={ic} /></span><div><b>{b}</b><span>{s}</span></div></Card>)}
    </Stagger>
  );
}

/* ─────────── FAQ ─────────── */
export function FaqList({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Stagger className="faq" amount={0.05} gap={0.05}>
      {FAQ.slice(0, limit).map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <Item key={q} className={'faq-item card' + (isOpen ? ' open' : '')}>
            <h3>
              <button className="faq-q" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-t">{q}</span>
                <span className="faq-ico" aria-hidden="true"><i /><i /></span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                  <div className="ans">{a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </Item>
        );
      })}
    </Stagger>
  );
}
