import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { MONTHS, ORDERS, REVENUE, SLA, SYMPTOMS } from '@/data/content';
import { useInView, useWidth } from '@/lib/hooks';
import { Icon } from './Icon';

interface Series { name: string; values: number[]; color: string; fmt: (v: number) => string; nudge?: number }
interface LineProps { label: string; min: number; max: number; ticks: number[]; unit?: string; target?: number; series: Series[]; endLabels?: boolean; area?: boolean; height?: number }

/** Hand-built SVG line chart: single axis, draw-in on scroll, crosshair tooltip. */
export function LineChart({ label, min, max, ticks, unit = '', target, series, endLabels, area, height = 250 }: LineProps) {
  const [box, W] = useWidth<HTMLDivElement>();
  const [vref, inView] = useInView<HTMLDivElement>('0px 0px -15% 0px');
  const [hover, setHover] = useState<number | null>(null);
  const gid = useId().replace(/:/g, '');
  const drawn = inView;
  const H = height, n = MONTHS.length, narrow = W < 460;
  const m = { l: 40, r: endLabels && !narrow ? 66 : 14, t: 12, b: 28 };
  const iw = Math.max(10, W - m.l - m.r), ih = H - m.t - m.b;
  const X = (i: number) => m.l + (iw * i) / (n - 1);
  const Y = (v: number) => m.t + ih - ((v - min) / (max - min)) * ih;
  const pathOf = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');

  const onMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    setHover(Math.max(0, Math.min(n - 1, Math.round((x - m.l) / (iw / (n - 1))))));
  };

  let tipLeft = 0;
  if (hover != null) { tipLeft = X(hover) + 14; if (tipLeft + 180 > W) tipLeft = X(hover) - 194; }

  return (
    <div ref={(el) => { box.current = el; vref.current = el; }} className={'chart' + (drawn ? ' drawn' : '')}>
      {W > 0 && (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}
          onMouseMove={(e) => onMove(e.clientX, e.currentTarget.getBoundingClientRect())}
          onTouchStart={(e) => onMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
          onMouseLeave={() => setHover(null)}>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: `var(${series[0].color})`, stopOpacity: 0.2 }} /><stop offset="1" style={{ stopColor: `var(${series[0].color})`, stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {ticks.map((tv, i) => (
            <g key={tv}>
              <line x1={m.l} x2={W - m.r} y1={Y(tv)} y2={Y(tv)} className={i === 0 ? 'ax' : 'gl'} />
              <text x={m.l - 8} y={Y(tv) + 4} textAnchor="end">{tv}{unit}</text>
            </g>
          ))}
          {MONTHS.map((mo, i) => <text key={mo} x={X(i)} y={H - 6} textAnchor="middle">{mo}</text>)}
          {target != null && <line x1={m.l} x2={W - m.r} y1={Y(target)} y2={Y(target)} className="target" />}
          {area && (
            <path className="area" fill={`url(#${gid})`}
              d={`${pathOf(series[0].values)} L${X(n - 1)} ${Y(min)} L${X(0)} ${Y(min)} Z`} />
          )}
          {series.map((s) => (
            <path key={s.name} className="ln" d={pathOf(s.values)} pathLength={1}
              style={{ stroke: `var(${s.color})`, strokeDasharray: '1', strokeDashoffset: drawn ? '0' : '1' }} />
          ))}
          {series.map((s) => {
            const li = n - 1;
            return (
              <g key={s.name + 'end'}>
                <circle cx={X(li)} cy={Y(s.values[li])} r={4.5} className="pt" style={{ fill: `var(${s.color})` }} />
                {endLabels && !narrow && <text x={X(li) + 10} y={Y(s.values[li]) + 4 + (s.nudge ?? 0)} className="end">{s.fmt(s.values[li])}</text>}
              </g>
            );
          })}
          {hover != null && (
            <g>
              <line x1={X(hover)} x2={X(hover)} y1={m.t} y2={m.t + ih} className="xh" />
              {series.map((s) => <circle key={s.name + 'h'} cx={X(hover)} cy={Y(s.values[hover])} r={5} className="pt" style={{ fill: `var(${s.color})` }} />)}
            </g>
          )}
          <rect x={m.l - 10} y={0} width={iw + 20} height={H} fill="transparent" />
        </svg>
      )}
      <div className={'tip' + (hover != null ? ' show' : '')} style={{ left: tipLeft, top: m.t + 6 }}>
        {hover != null && (
          <>
            <b>{MONTHS[hover]} 2026</b>
            {series.map((s) => <div key={s.name}><i style={{ background: `var(${s.color})` }} />{s.name}<strong>{s.fmt(s.values[hover])}</strong></div>)}
            {target != null && <div><i style={{ background: 'var(--faint)' }} />Target<strong>{target}%</strong></div>}
          </>
        )}
      </div>
    </div>
  );
}

export function BarList({ rows }: { rows: [string, number][] }) {
  const [ref, inView] = useInView<HTMLDivElement>('0px 0px -15% 0px');
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const total = rows.reduce((a, r) => a + r[1], 0), max = Math.max(...rows.map((r) => r[1]));
  const on = inView;
  return (
    <div className="hbars" ref={ref} style={{ position: 'relative' }} onMouseLeave={() => setHover(null)}>
      {rows.map(([label, v], i) => (
        <div className="hb" key={label}
          onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setHover({ i, x: e.clientX - r.left, y: (e.currentTarget as HTMLElement).offsetTop }); }}>
          <span>{label}</span>
          <div className="trk"><div className="fill" style={{ width: `${(v / max) * 100}%`, transform: on ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: `${200 + i * 90}ms` }} /></div>
          <b>{v}</b>
        </div>
      ))}
      <div className={'tip' + (hover ? ' show' : '')} style={hover ? { left: Math.min(hover.x + 14, (ref.current?.clientWidth ?? 300) - 190), top: hover.y - 78 } : undefined}>
        {hover && (
          <>
            <b>{rows[hover.i][0]}</b>
            <div><i style={{ background: 'var(--s1)' }} />Cases<strong>{rows[hover.i][1]}</strong></div>
            <div><i style={{ background: 'transparent' }} />Share<strong>{((rows[hover.i][1] / total) * 100).toFixed(0)}%</strong></div>
          </>
        )}
      </div>
    </div>
  );
}

export function DataTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="tbl">
      <summary>View as table</summary>
      <div className="tbl-wrap">
        <table>
          <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={String(r[0])}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </details>
  );
}

export function Insight({ children }: { children: ReactNode }) {
  return <div className="insight"><Icon name="bulb" /><span>{children}</span></div>;
}

const lakh = (v: number) => `₹${v.toFixed(1)} L`;
const pct = (v: number) => `${v.toFixed(1).replace('.0', '')}%`;
const symTotal = SYMPTOMS.reduce((a, r) => a + r[1], 0);

export function OrdersChartCard() {
  return (
    <div className="chart-card card">
      <div className="chart-head">
        <div><h3>Orders booked vs revenue invoiced</h3><p>₹ lakh per month</p></div>
        <div className="legend"><span><i style={{ background: 'var(--s1)' }} />Orders booked</span><span><i style={{ background: 'var(--s2)' }} />Revenue invoiced</span></div>
      </div>
      <LineChart label="Line chart of orders booked and revenue invoiced by month, in rupees lakh" min={0} max={120} ticks={[0, 30, 60, 90, 120]} endLabels area
        series={[{ name: 'Orders booked', values: ORDERS, color: '--s1', fmt: lakh, nudge: -2 }, { name: 'Revenue invoiced', values: REVENUE, color: '--s2', fmt: lakh, nudge: 2 }]} />
      <Insight>Orders held steady at around <b>₹100 L a month</b> from June while invoicing slowed in Aug–Sep — the gap is an order book waiting for dispatch, visible on the MD dashboard before it becomes a cash problem.</Insight>
      <DataTable head={['Month', 'Orders booked (₹ L)', 'Revenue invoiced (₹ L)']} rows={MONTHS.map((mo, i) => [mo, ORDERS[i].toFixed(1), REVENUE[i].toFixed(1)])} />
    </div>
  );
}

export function SlaChartCard() {
  return (
    <div className="chart-card card" style={{ '--rd': '.08s' } as CSSProperties}>
      <div className="chart-head">
        <div><h3>Complaints closed within SLA</h3><p>% of cases per month</p></div>
        <div className="legend"><span><i style={{ background: 'var(--s1)' }} />Within SLA</span><span><i className="dash" />Target 90%</span></div>
      </div>
      <LineChart label="Line chart of percent of complaints closed within SLA by month, against a 90 percent target" min={80} max={100} ticks={[80, 85, 90, 95, 100]} unit="%" target={90} area
        series={[{ name: 'Within SLA', values: SLA, color: '--s1', fmt: pct }]} />
      <Insight>From <b>87% in April to 100%</b> since August, after PIN-code routing and SLA escalations went live.</Insight>
      <DataTable head={['Month', 'Within SLA (%)', 'Target (%)']} rows={MONTHS.map((mo, i) => [mo, SLA[i].toFixed(1), '90'])} />
    </div>
  );
}

export function SymptomChartCard() {
  return (
    <div className="chart-card card wide">
      <div className="chart-head"><div><h3>What customers complain about</h3><p>Cases by reported symptom, Apr – Sep</p></div></div>
      <BarList rows={SYMPTOMS} />
      <Insight><b>Fluid leakage</b> is the top symptom at 26% of cases. Because every case is linked to a serial number, quality can trace it to the seal batch and supplier — systemic-issue detection raises the flag automatically.</Insight>
      <DataTable head={['Symptom', 'Cases', 'Share']} rows={SYMPTOMS.map(([s, v]) => [s, v, `${((v / symTotal) * 100).toFixed(0)}%`])} />
    </div>
  );
}
