import { Icon } from '@/components/Icon';
import { PageHero, SectionHead } from '@/components/ui';
import { Doors, StepCards } from '@/components/Sections';
import { Item, Stagger } from '@/lib/motion';
import { useTitle } from '@/lib/hooks';

export default function SignIn() {
  useTitle('Sign in');
  const steps: [string, string][] = [
    ['Choose your door', 'Staff use the ERP. Customers and distributors use the partner portal.'],
    ['Sign in with your account', 'Use the credentials shared by your administrator — each role sees its own view.'],
    ['Explore freely', 'Six months of generated operations are loaded. Nothing you do affects a real business.'],
  ];
  return (
    <>
      <PageHero eyebrow="Sign in" crumbs={[['Sign in']]} title={<>Two doors. <span className="grad-static">One source of truth.</span></>}
        lead="Staff run the business in the ERP. Customers and distributors order, pay and get service in their own portal — the same live data behind both." />
      <section className="section-tight">
        <div className="wrap"><Doors /></div>
      </section>
      <section className="alt">
        <div className="wrap">
          <SectionHead n="01" eyebrow="First time?" title={<>Get around in <em>two minutes.</em></>}
            sub="No account yet? Ask your administrator — access is set up per role, so everyone sees exactly their own work." />
          <StepCards steps={steps} />
          <Stagger className="tips" gap={0.07}>
            <Item><Icon name="phone" /><span><b>On the move:</b> both apps work in any phone browser — engineers get a focused "My day" view.</span></Item>
            <Item><Icon name="moon" /><span><b>Dark mode:</b> both apps have it — find it in the user menu.</span></Item>
            <Item><Icon name="search" /><span><b>Search:</b> press <span className="mono">Ctrl K</span> in the ERP to jump to any order, serial or party.</span></Item>
          </Stagger>
        </div>
      </section>
    </>
  );
}
