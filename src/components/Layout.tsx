import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useOutlet } from 'react-router';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from 'motion/react';
import { Icon } from './Icon';
import { AppLink, Arrow } from './ui';
import { cfg, company } from '@/lib/config';
import { useTheme } from '@/lib/hooks';
import { EASE, Magnetic } from '@/lib/motion';
import { lockScroll, scrollToTop, startSmoothScroll } from '@/lib/scroll';

export const NAV: [string, string][] = [
  ['/modules', 'Modules'],
  ['/analytics', 'Analytics'],
  ['/product-tour', 'Product tour'],
  ['/a-day', 'A day on it'],
  ['/integrations', 'Integrations'],
  ['/security', 'Security'],
  ['/faq', 'FAQ'],
];

function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b82c4" /><stop offset="1" stopColor="#163a5c" /></linearGradient></defs>
      <rect width="64" height="64" rx="16" fill="url(#lg)" />
      <rect x="1" y="1" width="62" height="62" rx="15" fill="none" stroke="#fff" strokeOpacity=".14" />
      <path d="M14 21l8 25 10-17 10 17 8-25" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="15" r="4" fill="#e8a33d" />
    </svg>
  );
}

/** Keeps the outgoing page's content while it animates out. */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button className="icon-btn theme-btn" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title="Light / dark mode">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} className="theme-ico"
          initial={{ rotate: -120, scale: 0.3, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 120, scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

const menuList: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } };
const menuItem: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };

export function Layout() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => { setScrolled(v > 40); setShowTop(v > 900); });
  useEffect(() => startSmoothScroll(), []);
  useEffect(() => {
    // Mouse-follow spotlight for every .card (CSS reads --mx / --my).
    const onMove = (e: PointerEvent) => {
      const c = (e.target as Element)?.closest?.('.card') as HTMLElement | null;
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
  useEffect(() => { setMenu(false); }, [pathname]);
  useEffect(() => {
    lockScroll(menu);
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [menu]);

  const year = new Date().getFullYear();
  const wordmark = company.split(' ')[0];

  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <header className={'nav' + (scrolled ? ' scrolled' : '') + (menu ? ' menu-open' : '')}>
        <div className="nav-shell">
          <div className="nav-bg" aria-hidden="true" />
          <Link to="/" className="brand" aria-label={`${company} home`}>
            <Logo />
            <span className="brand-name">{company}<small>Enterprise Platform</small></span>
          </Link>
          <nav className="nav-links" aria-label="Main">
            {NAV.map(([to, label]) => (
              <NavLink key={to} to={to}>
                {({ isActive }) => (<>{label}{isActive && <motion.span layoutId="nav-underline" className="nl-underline" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}</>)}
              </NavLink>
            ))}
          </nav>
          <div className="nav-cta">
            <ThemeToggle />
            <AppLink app="portal" className="btn btn-ghost btn-sm nav-portal">Partner portal</AppLink>
            <Link to="/sign-in" className="btn btn-primary btn-sm nav-signin">Sign in<Arrow /></Link>
            <button className="icon-btn menu-btn" onClick={() => setMenu((o) => !o)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
              <span className={'burger' + (menu ? ' x' : '')}><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="mnav" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }} transition={{ duration: 0.3 }}>
            <motion.nav variants={menuList} initial="hidden" animate="show" exit="hidden">
              {[['/', 'Home'] as [string, string], ...NAV, ['/mobile', 'Mobile'] as [string, string]].map(([to, label], i) => (
                <motion.div key={to} variants={menuItem}>
                  <NavLink to={to} end={to === '/'} className="mnav-link"><span className="mnav-n">{String(i + 1).padStart(2, '0')}</span>{label}</NavLink>
                </motion.div>
              ))}
              <motion.div variants={menuItem} className="mnav-apps">
                <AppLink app="erp" className="btn btn-primary btn-lg">Staff ERP<Arrow /></AppLink>
                <AppLink app="portal" className="btn btn-gold btn-lg">Partner portal<Arrow /></AppLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" onExitComplete={() => scrollToTop()}>
        <motion.main key={pathname} id="top" className="page"
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.42, ease: EASE }}>
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>

      <footer className="footer">
        <div className="hairline" />
        <div className="wrap">
          <div className="foot">
            <div className="foot-brand">
              <Link to="/" className="brand"><Logo size={34} /><span className="brand-name">{company}<small>Enterprise Platform</small></span></Link>
              <p>One connected system from order to cash to service — for staff, engineers, customers and distributors.</p>
              <span className="status-pill"><span className="dot" />All systems operational</span>
            </div>
            <div><h6>Sign in</h6><ul><li><AppLink app="erp">Staff ERP</AppLink></li><li><AppLink app="portal">Partner portal</AppLink></li><li><Link to="/sign-in">How to sign in</Link></li></ul></div>
            <div><h6>Product</h6><ul><li><Link to="/modules">Modules</Link></li><li><Link to="/analytics">Analytics</Link></li><li><Link to="/product-tour">Product tour</Link></li><li><Link to="/a-day">A day on it</Link></li><li><Link to="/mobile">Mobile</Link></li></ul></div>
            <div><h6>Company</h6><ul><li><Link to="/integrations">Integrations</Link></li><li><Link to="/security">Security</Link></li><li><Link to="/faq">FAQ</Link></li></ul></div>
            {(cfg.supportEmail || cfg.supportPhone) && (
              <div><h6>Contact</h6><ul>
                {cfg.supportEmail && <li><a href={`mailto:${cfg.supportEmail}`}>{cfg.supportEmail}</a></li>}
                {cfg.supportPhone && <li><a href={`tel:${cfg.supportPhone.replace(/\s/g, '')}`}>{cfg.supportPhone}</a></li>}
              </ul></div>
            )}
          </div>
          <div className="foot-bottom"><span>© {year} {company}. All rights reserved.</span><span>Made in India</span></div>
        </div>
        <div className="wordmark" aria-hidden="true">{wordmark}</div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.div className="totop" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
            <Magnetic strength={0.4}><button className="icon-btn" onClick={() => scrollToTop(true)} aria-label="Back to top"><Icon name="top" /></button></Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
