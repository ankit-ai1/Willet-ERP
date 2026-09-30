import { Icon } from '@/components/Icon';
import { Card } from '@/components/Card';
import { Cta, Eyebrow, PageHero } from '@/components/ui';
import { FaqList } from '@/components/Sections';
import { cfg } from '@/lib/config';
import { Item, Stagger } from '@/lib/motion';
import { useTitle } from '@/lib/hooks';

export default function Faq() {
  useTitle('FAQ');
  return (
    <>
      <PageHero eyebrow="FAQ" crumbs={[['FAQ']]} title={<>Questions, <span className="grad-static">answered.</span></>}
        lead="The things managers, accountants and IT usually ask first." />
      <section className="section-tight">
        <div className="wrap split faq-split">
          <Stagger className="split-text faq-aside">
            <Eyebrow n="01">Common questions</Eyebrow>
            <Item><h2>Straight <em>answers.</em></h2></Item>
            <Item className="sub">Tally, apps, data location, access, go-live and licences — the short version of each.</Item>
            {(cfg.supportEmail || cfg.supportPhone) && (
              <Card className="contact" tilt={false}>
                <h4>Still have a question?</h4>
                <p>Talk to the team — we'll walk you through it.</p>
                <div className="contact-links">
                  {cfg.supportEmail && <a className="btn btn-ghost" href={`mailto:${cfg.supportEmail}`}><Icon name="mail" />{cfg.supportEmail}</a>}
                  {cfg.supportPhone && <a className="btn btn-primary" href={`tel:${cfg.supportPhone.replace(/\s/g, '')}`}><Icon name="phone" />{cfg.supportPhone}</a>}
                </div>
              </Card>
            )}
          </Stagger>
          <FaqList />
        </div>
      </section>
      <Cta />
    </>
  );
}
