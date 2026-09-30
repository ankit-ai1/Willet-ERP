import { Cta, PageHero, SectionHead } from '@/components/ui';
import { IntegrationGrid, StepCards } from '@/components/Sections';
import { useTitle } from '@/lib/hooks';

export default function Integrations() {
  useTitle('Integrations');
  const tally: [string, string][] = [['Invoice saved', 'Sales invoice, credit note or bill is created in the ERP.'], ['Queued', 'A voucher with a unique ID waits in the Tally queue.'], ['Posted', 'The agent on the accounts PC posts it into TallyPrime.'], ['Pulled back', 'Receipts and outstanding flow back and update credit.']];
  return (
    <>
      <PageHero eyebrow="Integrations" crumbs={[['Integrations']]} title={<>Works with <span className="grad-static">what you already use.</span></>}
        lead="Keep Tally for accounts, keep your biometric machines, keep WhatsApp — the platform connects them instead of replacing them." />
      <section className="section-tight">
        <div className="wrap">
          <IntegrationGrid />
          <p className="demo-note">Live = working in this build · Ready = built, switched on once your account credentials are added.</p>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <SectionHead n="01" eyebrow="Tally, step by step" title={<>Nothing typed <em>twice.</em></>} sub="A small agent on the accounts PC keeps the ERP and TallyPrime in step — even if the PC is switched off for a while." />
          <StepCards steps={tally} />
        </div>
      </section>
      <Cta />
    </>
  );
}
