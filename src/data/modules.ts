import type { IconName } from '@/components/Icon';

export interface Module {
  slug: string;
  icon: IconName;
  title: string;
  short: string;
  img: string;
  url: string;
  desc: string;
  story: string[];
  features: [string, string][];
  metrics: [string, string][];
  who: string[];
  connects: string[];
}

export const MODULES: Module[] = [
  {
    slug: 'sales', icon: 'cart', title: 'Sales & dispatch', short: 'Quote → order → invoice', img: 'sales', url: 'erp.willet.in / sales / orders',
    desc: 'From a quotation to a delivered, GST-compliant invoice — with credit checked before anything leaves the gate.',
    story: [
      'A distributor orders from the portal, or the sales team keys it from a quotation. Either way the order is checked against the party\'s credit limit and overdue dues the moment it is saved — risky orders go on credit hold for the CFO, the rest move straight on.',
      'Confirmed orders reserve stock by batch and serial. The dispatch planner shows what can ship today, the e-invoice IRN and e-way bill are generated at dispatch, and the customer gets a WhatsApp update with the vehicle and LR number.',
    ],
    features: [
      ['Quotations & price lists', 'Standard price lists, customer contract prices and discounts with approval limits.'],
      ['Credit check & hold', 'Every order is checked against limit and overdue days; holds go to the CFO\'s inbox.'],
      ['Dispatch planner', 'Allocates live stock to open orders and plans today\'s loads by route.'],
      ['E-invoice & e-way bill', 'IRN, QR code and e-way bill generated at dispatch through your GSP.'],
      ['Proof of delivery', 'POD captured against the invoice, closing the order automatically.'],
      ['Returns & credit notes', 'Sales returns with QC, credit notes posted to Tally without re-typing.'],
    ],
    metrics: [['0', 're-typed orders'], ['1-click', 'e-invoice + e-way bill'], ['Live', 'credit check']],
    who: ['Sales head', 'Sales executives', 'CFO', 'Logistics'],
    connects: ['inventory', 'accounts-tally', 'approvals'],
  },
  {
    slug: 'inventory', icon: 'box', title: 'Inventory', short: 'Batches, serials, vans', img: 'stock', url: 'erp.willet.in / inventory / stock',
    desc: 'Ledger-based stock you can trust — by warehouse, batch and serial, including what sits in engineer vans.',
    story: [
      'Every movement — receipt, issue, transfer, dispatch, adjustment — is a line in one stock ledger, valued at moving average. That is why the stock screen is always right and always explains itself.',
      'Batches follow FEFO, serials keep their full history from supplier batch to work order to customer to every complaint, and engineer vans are simply warehouses on wheels.',
    ],
    features: [
      ['Multi-warehouse stock', 'Plants, depots and vans with bin locations and moving-average value.'],
      ['Batches with FEFO', 'Expiry-aware picking so the oldest usable stock always goes first.'],
      ['Serial genealogy', 'Supplier batch → work order → customer → complaints, in one click.'],
      ['Reservations', 'Stock is reserved the moment an order is confirmed — no double promises.'],
      ['Transfers & vans', 'Inter-warehouse and van transfers with in-transit tracking.'],
      ['Cycle counts', 'ABC-based counting with variance approval instead of annual shutdowns.'],
    ],
    metrics: [['Live', 'stock by batch & serial'], ['ABC', 'cycle counting'], ['100%', 'movements on ledger']],
    who: ['Stores', 'Logistics', 'Plant head', 'Auditors'],
    connects: ['sales', 'production', 'service'],
  },
  {
    slug: 'production', icon: 'factory', title: 'Production', short: 'BOMs & work orders', img: 'work-orders', url: 'erp.willet.in / production / work-orders',
    desc: 'Plan what to make from open orders and shortages, then track every work order from release to finished serials.',
    story: [
      'Planning looks at open sales orders, stock and minimum levels and proposes what to make and what to buy. Shortages turn into purchase requisitions automatically.',
      'Released work orders issue material against the BOM, record output with serial numbers and log scrap — so yield and material cost are known per order, not estimated at month end.',
    ],
    features: [
      ['Versioned BOMs', 'Bills of materials with versions, effective dates and roll-up costing.'],
      ['MRP-style planning', 'What to make and buy, driven by real demand and stock.'],
      ['Work order release', 'Release, material issue and production receipt in a few taps.'],
      ['Serials at birth', 'Finished goods get their serial the moment they are produced.'],
      ['Scrap & yield', 'Scrap reasons and yield per order and per product.'],
      ['Quality gates', 'Final QC inspection before goods become available to sell.'],
    ],
    metrics: [['BOM', 'versions & costing'], ['Auto', 'shortage requisitions'], ['Per WO', 'yield & scrap']],
    who: ['Plant head', 'Production planner', 'Quality', 'Stores'],
    connects: ['inventory', 'sales', 'md-dashboard'],
  },
  {
    slug: 'service', icon: 'headset', title: 'Service desk', short: 'Complaints on SLA', img: 'cases', url: 'erp.willet.in / service / cases',
    desc: 'Every complaint — from portal, email, WhatsApp or phone — on one SLA clock, routed by PIN code to the right engineer.',
    story: [
      'A complaint arrives from any channel and becomes a case linked to the product serial. The site\'s PIN code decides the territory and engineer, and the SLA clock starts immediately — pausing when waiting on the customer, escalating before a breach.',
      'Engineers see the visit in "My day", check in with GPS, attach photos and parts, and take the customer\'s signature. The customer rates the visit, and repeated symptoms on the same batch are flagged to quality.',
    ],
    features: [
      ['Omnichannel intake', 'Portal, email, WhatsApp and phone — all become one case.'],
      ['PIN-code routing', 'The right territory and engineer, assigned automatically.'],
      ['SLA clocks', 'Response and resolution clocks with pause and escalation.'],
      ['Field visits', 'GPS check-in, photos, parts used and customer signature.'],
      ['Warranty claims', 'Warranty checked by serial; claims raised to suppliers.'],
      ['CSAT & systemic issues', 'Ratings after closure; repeat symptoms flagged to quality.'],
    ],
    metrics: [['97.6%', 'within SLA'], ['4.15/5', 'customer rating'], ['PIN', 'code routing']],
    who: ['Service head', 'Support desk', 'Field engineers', 'Quality'],
    connects: ['inventory', 'people', 'md-dashboard'],
  },
  {
    slug: 'people', icon: 'cal', title: 'People & attendance', short: 'Biometric, leave, payroll', img: 'people', url: 'erp.willet.in / people',
    desc: 'Attendance straight from biometric machines and geo-fenced phone punches, with leave and month-end close built in.',
    story: [
      'ZKTeco and eSSL terminals push punches live; field staff punch from the browser inside a geo-fence. Shifts and rosters turn punches into present, late, half-day and overtime automatically.',
      'Leave goes through two-level approval with live balances, missed punches are regularised with a reason, and at month end the period is closed and payroll inputs are posted to Tally as a journal.',
    ],
    features: [
      ['Biometric push', 'ZKTeco / eSSL devices send punches live, with offline buffering.'],
      ['Geo-fenced punch', 'Browser punch allowed only inside the plant or site boundary.'],
      ['Shifts & rosters', 'Rotating shifts, weekly offs and holidays per location.'],
      ['Two-level leave', 'Manager then HR approval, with balances shown at every step.'],
      ['Regularisation', 'Missed or wrong punches fixed with a reason and approval.'],
      ['Payroll inputs', 'Period close locks attendance and posts the payroll journal to Tally.'],
    ],
    metrics: [['0', 'manual muster'], ['2-level', 'leave approval'], ['Live', 'biometric feed']],
    who: ['HR', 'Managers', 'All employees', 'Accounts'],
    connects: ['accounts-tally', 'approvals', 'access-control'],
  },
  {
    slug: 'accounts-tally', icon: 'sync', title: 'Accounts & Tally', short: 'Two-way sync', img: 'tally', url: 'erp.willet.in / accounts / tally',
    desc: 'Tally stays your books. Vouchers post automatically and payments flow back — reconciled, with nothing typed twice.',
    story: [
      'A small agent on the accounts PC talks to TallyPrime. Invoices, credit notes, purchase bills and the payroll journal queue up and post automatically, each with a unique ID so nothing is ever posted twice.',
      'Receipts and outstanding are pulled back from Tally, so credit checks and the portal\'s statement of account always use the real numbers. A reconciliation report shows both sides match.',
    ],
    features: [
      ['Voucher queue', 'Automatic posting with retry, and parking for anything that needs a look.'],
      ['Ledger & item mapping', 'Auto-map ledgers and stock items; confirm the few that differ.'],
      ['Payments pulled back', 'Receipts and outstanding from Tally update every party.'],
      ['Reconciliation', 'ERP vs Tally balances side by side, differences listed.'],
      ['Offline-safe agent', 'If the accounts PC is off, vouchers wait and post later.'],
      ['Duplicate-proof', 'Every voucher carries a unique REMOTEID — never posted twice.'],
    ],
    metrics: [['98.9%', 'first-time sync'], ['2-way', 'Tally ⇄ ERP'], ['0', 'duplicate vouchers']],
    who: ['Accounts', 'CFO', 'Auditors'],
    connects: ['sales', 'people', 'md-dashboard'],
  },
  {
    slug: 'approvals', icon: 'inbox', title: 'Approvals', short: 'One inbox for decisions', img: 'approvals', url: 'erp.willet.in / approvals',
    desc: 'Purchase orders, credit releases, leave and stock adjustments — every decision waiting on you, in one inbox.',
    story: [
      'Approval chains are set by value and type: a small PO needs the purchase manager, a big one also needs the CFO and MD. Each approver sees exactly what is waiting on them, with the full document one tap away.',
      'Sensitive changes can require two people. Everything — approve, reject, comment — is recorded in the audit trail.',
    ],
    features: [
      ['Value-based chains', 'Different approvers by amount, category and location.'],
      ['Credit hold release', 'CFO releases held orders with a reason.'],
      ['Leave & regularisation', 'Managers approve their team from the same inbox.'],
      ['Stock adjustments', 'Variances from counts need approval before posting.'],
      ['Dual authorisation', 'Two people required for sensitive master changes.'],
      ['History & comments', 'Who approved what, when and why — always visible.'],
    ],
    metrics: [['1', 'inbox for everything'], ['2 taps', 'on mobile'], ['100%', 'decisions audited']],
    who: ['MD', 'CFO', 'Department heads', 'Managers'],
    connects: ['sales', 'people', 'access-control'],
  },
  {
    slug: 'md-dashboard', icon: 'chart', title: 'MD dashboard & reports', short: 'What needs attention', img: 'exceptions', url: 'erp.willet.in / exceptions',
    desc: 'The platform watches the business for you — KPIs against target, and exceptions ranked by the money at stake.',
    story: [
      'The MD opens one screen: revenue, margin, order book, OTIF, SLA, attendance and cash — each against target, each clickable down to the documents behind it.',
      'The exception feed ranks what needs attention by value at stake. At month end, close gates turn green and signed PDF and Excel packs go out to each audience automatically.',
    ],
    features: [
      ['Executive dashboard', '30+ KPIs against target with trend and drill-down.'],
      ['Exception feed', 'Overdue dues, credit holds, SLA risks and stock-outs by ₹ at stake.'],
      ['Module dashboards', 'Sales, service, production, HR and accounts each get their own.'],
      ['Report builder', 'Pick columns and filters, export to Excel — no IT ticket.'],
      ['Month-end close', 'Close gates make sure the numbers are final before packs go out.'],
      ['Signed monthly packs', 'Seven audience packs in PDF & Excel, signed and distributed.'],
    ],
    metrics: [['30+', 'KPIs tracked'], ['7', 'monthly packs'], ['₹', 'ranked exceptions']],
    who: ['MD', 'CFO', 'Department heads'],
    connects: ['sales', 'service', 'accounts-tally'],
  },
  {
    slug: 'access-control', icon: 'lock', title: 'Admin & access', short: 'Roles, MFA, audit', img: 'roles', url: 'erp.willet.in / admin / roles',
    desc: 'Exactly who can see and do what — by role and by territory — with every change recorded.',
    story: [
      'Roles combine permissions with a data scope: a sales executive sees only their territory, a plant head only their location, the MD everything. The same rules apply to the portal, so customers only ever see their own data.',
      'Two-factor sign-in protects finance and admin roles, segregation-of-duties rules stop one person from both creating and approving, and the audit log keeps before-and-after values for every change.',
    ],
    features: [
      ['Role × permission matrix', 'Clear, editable matrix of who can do what.'],
      ['Data scope', 'Company, location, territory, team or self — per role.'],
      ['Two-factor sign-in', 'Authenticator app with recovery codes.'],
      ['Segregation of duties', 'Conflicting permissions are flagged before they are granted.'],
      ['Audit log', 'Before and after values, user, time and IP for every change.'],
      ['Sessions & API keys', 'See and revoke sessions; keys for Tally agent and devices.'],
    ],
    metrics: [['MFA', 'for finance & admin'], ['100%', 'changes audited'], ['5', 'data-scope levels']],
    who: ['System admin', 'Auditors', 'MD'],
    connects: ['approvals', 'people', 'md-dashboard'],
  },
];

export const moduleBySlug = (s: string) => MODULES.find((m) => m.slug === s);
