import { Link } from 'react-router';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/ui';
import { useTitle } from '@/lib/hooks';

export default function NotFound() {
  useTitle('Page not found');
  return (
    <PageHero eyebrow="404" title={<>This page <span className="grad-static">doesn't exist.</span></>} lead="The link may be old or mistyped.">
      <div className="cta-row"><Link to="/" className="btn btn-primary btn-lg"><Icon name="back" />Back to home</Link></div>
    </PageHero>
  );
}
