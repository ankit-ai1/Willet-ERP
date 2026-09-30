import type { IconName } from '@/components/Icon';
import { Cta, PageHero, SectionHead } from '@/components/ui';
import { FeatureGrid, Tour } from '@/components/Sections';
import { useTitle } from '@/lib/hooks';

export default function TourPage() {
  useTitle('Product tour');
  const f: [IconName, string, string][] = [
    ['search', 'Search everything', 'Ctrl K finds any order, serial, party or case from anywhere.'],
    ['moon', 'Light & dark', 'Easy on the eyes on a night shift or a sunny site.'],
    ['phone', 'Same app on phone', 'Every screen adapts — no separate mobile app to maintain.'],
    ['bell', 'Notifications', 'Approvals, holds and SLA risks come to you, not the other way round.'],
  ];
  return (
    <>
      <PageHero eyebrow="Product tour" crumbs={[['Product tour']]} title={<>Designed to be <span className="grad-static">used.</span></>}
        lead="A clean, fast interface that works the same on a desktop in the plant office and a phone at a customer site. Pick a screen." />
      <section className="section-tight">
        <div className="wrap"><Tour /></div>
      </section>
      <section className="alt">
        <div className="wrap">
          <SectionHead n="01" eyebrow="Details" title={<>Small things, <em>done properly.</em></>} />
          <FeatureGrid items={f} />
        </div>
      </section>
      <Cta />
    </>
  );
}
