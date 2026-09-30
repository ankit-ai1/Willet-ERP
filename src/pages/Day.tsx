import { Cta, PageHero } from '@/components/ui';
import { DayTimeline } from '@/components/Sections';
import { useTitle } from '@/lib/hooks';

export default function Day() {
  useTitle('A day on the platform');
  return (
    <>
      <PageHero eyebrow="A day on the platform" crumbs={[['A day on it']]} title={<>Every role, <span className="grad-static">a clear day.</span></>}
        lead="Each person opens the ERP and sees exactly their work — nothing more. Pick a role to follow a typical day." />
      <section className="section-tight"><div className="wrap"><DayTimeline /></div></section>
      <Cta />
    </>
  );
}
