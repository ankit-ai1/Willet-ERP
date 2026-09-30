/** Runtime settings from /config.js — editable after build, no rebuild needed. */
export interface SiteConfig {
  erp?: string;
  portal?: string;
  company?: string;
  supportEmail?: string;
  supportPhone?: string;
}

declare global {
  interface Window {
    WEP_CONFIG?: SiteConfig;
  }
}

export const cfg: SiteConfig = (typeof window !== 'undefined' && window.WEP_CONFIG) || {};
export const company = cfg.company || 'Willet Industries';

export type AppKey = 'erp' | 'portal';
export function appUrl(key: AppKey): string | null {
  const u = cfg[key];
  return u && /^https?:\/\//.test(u) && !u.includes('PASTE') ? u : null;
}
