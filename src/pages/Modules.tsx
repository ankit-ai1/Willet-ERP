import { Cta, PageHero, SectionHead } from '@/components/ui';
import { FlowStory, ModuleCards, ModuleExplorer } from '@/components/Sections';
import { useTitle } from '@/lib/hooks';

export default function Modules() {
  useTitle('Modules');
  return (
    <>
      <PageHero eyebrow="Modules" crumbs={[['Modules']]} title={<>Every department, <span className="grad-static">one platform.</span></>}
        lead="No re-typing between Excel sheets, Tally and WhatsApp groups. An order placed at 10 am shows up in stores, production, accounts and the MD's dashboard — instantly." />
      <section className="section-tight">
        <div className="wrap"><ModuleExplorer /></div>
      </section>
      <section className="alt">
        <div className="wrap">
          <FlowStory n="01" title={<>One record, <em>six hand-offs.</em></>}
            sub="Follow a single order through the modules — each step picks up exactly where the last one left off." />
        </div>
      </section>
      <section>
        <div className="wrap">
          <SectionHead n="02" eyebrow="All modules" title={<>Pick one to <em>go deeper.</em></>} sub="Each module has its own page — what it does, who uses it and how it connects to the rest." />
          <ModuleCards />
        </div>
      </section>
      <Cta />
    </>
  );
}
