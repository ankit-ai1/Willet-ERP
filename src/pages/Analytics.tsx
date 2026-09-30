import type { IconName } from '@/components/Icon';
import { Cta, PageHero, SectionHead } from '@/components/ui';
import { FeatureGrid, ImpactBand, KpiGrid } from '@/components/Sections';
import { OrdersChartCard, SlaChartCard, SymptomChartCard } from '@/components/Charts';
import { Item, Stagger } from '@/lib/motion';
import { useTitle } from '@/lib/hooks';

export default function Analytics() {
  useTitle('Analytics');
  const how: [IconName, string, string][] = [
    ['zap', 'Live, not monthly', 'KPIs refresh from the same records staff work in — no exports, no copy-paste.'],
    ['search', 'Click to drill down', 'Every number opens the list of orders, invoices or cases behind it.'],
    ['alert', 'Exceptions, ranked', 'What needs attention today, ordered by the money at stake.'],
    ['file', 'Signed monthly packs', 'Seven audience packs in PDF & Excel, generated when books close.'],
  ];
  return (
    <>
      <PageHero eyebrow="Analytics" crumbs={[['Analytics']]} title={<>Numbers the MD can <span className="grad-static">act on.</span></>}
        lead="Every order, dispatch, complaint and voucher feeds the same KPIs. Here's a six-month slice from the demo company — hover any chart for details." />
      <section className="section-tight band-sec">
        <div className="band"><div className="wrap"><ImpactBand /></div></div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          <SectionHead n="01" eyebrow="Key figures" title={<>Six months, <em>at a glance.</em></>} />
          <KpiGrid />
          <Stagger className="charts" amount={0.05}>
            <Item><OrdersChartCard /></Item>
            <Item><SlaChartCard /></Item>
            <Item className="span-all"><SymptomChartCard /></Item>
          </Stagger>
          <p className="demo-note">Figures are from the demo company's six months of generated operations.</p>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <SectionHead n="02" eyebrow="How it works" title={<>Reporting that <em>runs itself.</em></>} />
          <FeatureGrid items={how} />
        </div>
      </section>
      <Cta title="See the real dashboard." sub="Sign in as the MD to explore every KPI and drill down to the documents behind it." />
    </>
  );
}
