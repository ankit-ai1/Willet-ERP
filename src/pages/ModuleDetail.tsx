import { Link, useParams } from 'react-router';
import { Icon, type IconName } from '@/components/Icon';
import { Card } from '@/components/Card';
import { AppLink, Arrow, Cta, Eyebrow, Frame, PageHero, SectionHead } from '@/components/ui';
import { FeatureGrid } from '@/components/Sections';
import { MODULES, moduleBySlug } from '@/data/modules';
import { Item, Stagger } from '@/lib/motion';
import { useTitle } from '@/lib/hooks';
import NotFound from './NotFound';

export default function ModuleDetail() {
  const { slug = '' } = useParams();
  const m = moduleBySlug(slug);
  useTitle(m ? m.title : 'Not found');
  if (!m) return <NotFound />;
  const i = MODULES.indexOf(m);
  const prev = MODULES[(i - 1 + MODULES.length) % MODULES.length], next = MODULES[(i + 1) % MODULES.length];
  return (
    <>
      <PageHero eyebrow={m.short} crumbs={[['Modules', '/modules'], [m.title]]} title={<><span className="hero-ico"><Icon name={m.icon} /></span>{m.title}</>} lead={m.desc}
        aside={<div className="metric-stack">{m.metrics.map(([v, l]) => <div key={l} className="metric card"><b>{v}</b><span>{l}</span></div>)}</div>}>
        <div className="cta-row">
          <AppLink app="erp" className="btn btn-primary btn-lg">Try it in the ERP<Arrow /></AppLink>
          <Link to="/sign-in" className="btn btn-ghost btn-lg">How to sign in</Link>
        </div>
      </PageHero>

      <section className="section-tight">
        <div className="wrap">
          <Item standalone className="shot-wide">
            <div className="stage-glow" />
            <Frame url={m.url}><img src={`/assets/${m.img}.jpg`} alt={`${m.title} screen`} width={1440} height={900} decoding="async" /></Frame>
          </Item>
        </div>
      </section>

      <section className="alt">
        <div className="wrap split">
          <Stagger className="split-text">
            <Eyebrow n="01">How it works</Eyebrow>
            <Item><h2>{m.title}, <em>end to end.</em></h2></Item>
            {m.story.map((p) => <Item key={p.slice(0, 20)} className="sub">{p}</Item>)}
          </Stagger>
          <Stagger>
            <Card className="who" tilt={false}>
              <h4>Who uses it</h4>
              <div className="who-list">{m.who.map((w) => <span key={w}><Icon name="users" />{w}</span>)}</div>
              <h4 className="who-h">Connected to</h4>
              <div className="conn">
                {m.connects.map((s) => { const c = moduleBySlug(s)!; return <Link key={s} to={`/modules/${s}`}><span className="mi"><Icon name={c.icon} /></span>{c.title}<Arrow /></Link>; })}
              </div>
            </Card>
          </Stagger>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead n="02" eyebrow="Features" title={<>What's <em>inside.</em></>} />
          <FeatureGrid check items={m.features.map(([t, p]): [IconName, string, string] => ['check', t, p])} />
          <Stagger className="pn">
            <Card to={`/modules/${prev.slug}`}><small><Icon name="back" /> Previous</small><b>{prev.title}</b></Card>
            <Card to={`/modules/${next.slug}`} className="right"><small>Next <Icon name="arrow" /></small><b>{next.title}</b></Card>
          </Stagger>
        </div>
      </section>
      <Cta />
    </>
  );
}
