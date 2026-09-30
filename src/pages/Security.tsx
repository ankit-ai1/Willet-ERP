import type { IconName } from '@/components/Icon';
import { Cta, Frame, PageHero, SectionHead } from '@/components/ui';
import { Architecture, FeatureGrid, SecurityList } from '@/components/Sections';
import { Item } from '@/lib/motion';
import { useTitle } from '@/lib/hooks';

export default function Security() {
  useTitle('Security');
  const facts: [IconName, string, string][] = [
    ['server', 'One server', '8 cores, 32 GB RAM runs the whole company.'],
    ['layers', 'Open technology', 'React, NestJS, PostgreSQL — no licence fees.'],
    ['sync', 'Nightly backups', 'Encrypted, 14 days local, copy off-site.'],
    ['key', 'Upgrades in one command', 'Migrations are checksummed and applied once.'],
  ];
  return (
    <>
      <PageHero eyebrow="Security & control" crumbs={[['Security']]} title={<>Your data, your servers, <span className="grad-static">your rules.</span></>}
        lead="Deployed on Willet's own servers. Every user sees only what their role and area allow, and every change is recorded." />
      <section className="section-tight">
        <div className="wrap split">
          <SecurityList />
          <Item standalone className="split-visual"><Frame url="erp.willet.in / admin / roles"><img src="/assets/roles.jpg" alt="Roles and permissions matrix" width={1440} height={900} decoding="async" /></Frame></Item>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <SectionHead n="01" eyebrow="Under the hood" title={<>Simple to run. <em>Built to last.</em></>} sub="One server in your office or data centre. Modern, open technology — no per-user licence fees, no vendor lock-in." />
          <Architecture />
          <div className="gap-top"><FeatureGrid items={facts} /></div>
        </div>
      </section>
      <Cta />
    </>
  );
}
