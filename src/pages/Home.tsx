import { Link } from 'react-router';
import { Arrow, ArrowLink, Cta, Eyebrow, SectionHead } from '@/components/ui';
import { BeforeAfter, BentoModules, Doors, FeatureRows, FlowStory, Hero, ImpactBand, IntegrationGrid, Phones, Testimonials } from '@/components/Sections';
import { OrdersChartCard } from '@/components/Charts';
import { Item, Stagger } from '@/lib/motion';
import { useTitle } from '@/lib/hooks';

export default function Home() {
  useTitle('');
  return (
    <>
      <Hero />

      <section>
        <div className="wrap">
          <SectionHead n="01" eyebrow="Why it matters" title={<>From scattered sheets to <em>one version of the truth.</em></>}
            sub="Most plants run on Excel, Tally, WhatsApp groups and phone calls. Each is fine on its own — the cost is in the gaps between them. The platform closes those gaps." />
          <BeforeAfter />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <SectionHead n="02" eyebrow="Modules" title={<>Every department, <em>one platform.</em></>}
            sub="Nine modules sharing one database. Each has its own page with screens, features and who uses it." />
          <BentoModules />
          <div className="sec-foot"><Link to="/modules" className="btn btn-ghost btn-lg">Open the module explorer<Arrow /></Link></div>
        </div>
      </section>

      <section className="band-sec">
        <div className="wrap">
          <SectionHead n="03" eyebrow="Impact" title={<>Numbers the MD can <em>act on</em> — not wait for.</>}
            sub="Every order, dispatch, complaint and voucher feeds the same KPIs. A six-month slice from the demo company:" />
        </div>
        <div className="band"><div className="wrap"><ImpactBand /></div></div>
        <div className="wrap split split-chart">
          <Stagger className="split-text">
            <Eyebrow>Orders vs invoicing</Eyebrow>
            <Item><h3 className="h3-lg">See the gap <em>before</em> it becomes a cash problem.</h3></Item>
            <Item className="sub">Hover the chart for monthly figures, or open it as a table. Every number drills down to the orders and invoices behind it in the ERP.</Item>
            <Item className="split-link"><ArrowLink to="/analytics">See all charts &amp; insights</ArrowLink></Item>
          </Stagger>
          <Item standalone><OrdersChartCard /></Item>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <FlowStory n="04" title={<>From a distributor's order to <em>a happy customer.</em></>}
            sub="Six steps, one record. Each step picks up exactly where the last one left off — nobody re-enters anything." />
        </div>
      </section>

      <section>
        <div className="wrap split mob reverse">
          <Stagger className="split-text">
            <Eyebrow n="05">Built for the field</Eyebrow>
            <Item><h2>The whole business, <em>in your pocket.</em></h2></Item>
            <Item className="sub">No app to install. Open the link in any phone browser — engineers get a focused "My day" view built for one hand.</Item>
            <FeatureRows items={[['pin', 'GPS check-in at the site', 'Visits stamped with location and time.'], ['camera', 'Photos, parts and signature', 'Engineers close the job on the spot.'], ['bell', 'Approvals on the go', 'The MD approves POs and credit in two taps.']]} />
            <Item className="split-link"><ArrowLink to="/mobile">More on mobile</ArrowLink></Item>
          </Stagger>
          <Phones />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <SectionHead n="06" eyebrow="Integrations" title={<>Works with <em>what you already use.</em></>}
            sub="Keep Tally, your biometric machines and WhatsApp — the platform connects them instead of replacing them." />
          <IntegrationGrid limit={4} />
          <div className="sec-foot"><ArrowLink to="/integrations">All integrations</ArrowLink></div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead n="07" eyebrow="In their words" title={<>Built around <em>how plants really run.</em></>}
            sub="What changes for each role once every department works from the same record." />
          <Testimonials />
        </div>
      </section>

      <section id="login" className="alt">
        <div className="wrap">
          <SectionHead n="08" eyebrow="Sign in" title={<>Two doors. <em>One source of truth.</em></>}
            sub="Staff run the business in the ERP. Customers and distributors order, pay and get service in their own portal — the same live data behind both." />
          <Doors />
        </div>
      </section>

      <Cta />
    </>
  );
}
