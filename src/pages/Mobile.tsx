import { PageHero, Cta, SectionHead } from '@/components/ui';
import { FeatureRows, Phones, StepCards } from '@/components/Sections';
import { useTitle } from '@/lib/hooks';

export default function Mobile() {
  useTitle('Mobile');
  const steps: [string, string][] = [['Open "My day"', 'Visits in route order with customer, serial and service history.'], ['Check in at site', 'GPS-stamped arrival; the customer gets a WhatsApp update.'], ['Fix & record', 'Photos, parts used from the van, notes — all on the phone.'], ['Sign & close', 'Customer signs on screen; the SLA clock stops and CSAT is requested.']];
  return (
    <>
      <PageHero eyebrow="Built for the field" crumbs={[['Mobile']]} title={<>The whole business, <span className="grad-static">in your pocket.</span></>}
        lead="No app to install. Open the link in any phone browser — the layout adapts, and engineers get a focused view built for one hand." />
      <section className="section-tight">
        <div className="wrap split mob">
          <Phones />
          <FeatureRows items={[
            ['pin', 'GPS check-in at the site', 'Visits are stamped with location and time; attendance punch is geo-fenced to the plant.'],
            ['camera', 'Photos, parts and signature', 'Engineers close the job on the spot — the customer signs on the screen.'],
            ['bell', 'Approvals on the go', 'The MD and CFO approve POs, credit and leave from the phone in two taps.'],
            ['users', 'Partner portal on any phone', 'Distributors order, pay and raise complaints from their own phone, 24×7.'],
          ]} />
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <SectionHead n="01" eyebrow="An engineer's visit" title={<>Four taps from <em>arrival to closure.</em></>} />
          <StepCards steps={steps} />
        </div>
      </section>
      <Cta />
    </>
  );
}
