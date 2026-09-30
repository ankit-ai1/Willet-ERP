import type { IconName } from '@/components/Icon';

/* ── analytics (demo company, Apr–Sep) ── */
export const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
export const ORDERS = [70.8, 85.8, 100.5, 98.3, 103.2, 100.6];
export const REVENUE = [54.4, 69.6, 77.4, 77.2, 53.6, 51.8];
export const SLA = [87.0, 97.7, 95.3, 98.0, 100, 100];
export const SYMPTOMS: [string, number][] = [
  ['Fluid leakage', 50], ['Abnormal noise or vibration', 36], ['Overheats or shuts down', 34],
  ['Electrical fault or tripping', 31], ['Output below specification', 21], ['Unit does not start', 20],
];

export interface Kpi { label: string; icon: IconName; prefix?: string; value: number; dec: number; suffix?: string; note: string; delta?: string; meter: number }
export const KPIS: Kpi[] = [
  { label: 'Revenue invoiced', icon: 'rupee', prefix: '₹', value: 3.84, dec: 2, suffix: ' Cr', note: 'Apr – Sep, GST-ready invoices', delta: '6 mo', meter: 77 },
  { label: 'Complaints within SLA', icon: 'clock', value: 97.6, dec: 1, suffix: '%', note: 'since April', delta: '+13 pts', meter: 97.6 },
  { label: 'Customer satisfaction', icon: 'star', value: 4.15, dec: 2, suffix: ' / 5', note: 'CSAT after every closed case', meter: 83 },
  { label: 'Tally first-time sync', icon: 'sync', value: 98.9, dec: 1, suffix: '%', note: 'Vouchers posted without manual fix', meter: 98.9 },
];

/* ── a day on the platform ── */
export interface Day { role: string; initials: string; items: [string, string, string, string][] }
export const DAYS: Day[] = [
  { role: 'Managing Director', initials: 'MD', items: [
    ['09:00', 'Morning pulse', 'Revenue, order book, OTIF, SLA and cash on one screen — against target.', 'MD dashboard'],
    ['09:15', 'Exceptions first', 'Three overdue distributors and one SLA risk, ranked by value at stake.', 'Exception feed'],
    ['11:30', 'Approves a big PO', 'Two taps on the phone between meetings; the chain moves on instantly.', 'Approvals'],
    ['1st of month', 'Signed pack arrives', 'The monthly MD pack — PDF and Excel — lands in the inbox once books close.', 'Monthly reports']] },
  { role: 'Sales head', initials: 'SH', items: [
    ['09:30', 'Order book review', 'Open orders by distributor with credit status and promised dates.', 'Sales orders'],
    ['10:10', 'Quote to order', 'A quotation accepted by the customer becomes an order in one click.', 'Quotations'],
    ['14:00', 'Credit hold released', 'CFO approves; the dispatch planner picks it up automatically.', 'Credit control'],
    ['17:30', 'Dispatch plan', 'Tomorrow\'s loads allocated from live stock — no phone calls to stores.', 'Dispatch planner']] },
  { role: 'Stores', initials: 'ST', items: [
    ['08:30', 'Pick list ready', 'Today\'s picks by bin and batch, FEFO applied automatically.', 'Dispatch'],
    ['11:00', 'GRN with QC', 'Supplier material received; QC sample triggered before it can be used.', 'Goods receipt'],
    ['15:00', 'Van transfer', 'Spare parts moved to an engineer\'s van — tracked like any warehouse.', 'Transfers'],
    ['16:30', 'Cycle count', 'Ten A-class items counted; variances go for approval.', 'Cycle counts']] },
  { role: 'Service engineer', initials: 'EN', items: [
    ['08:45', '"My day" on the phone', 'Today\'s visits in route order with customer, serial and history.', 'Engineer view'],
    ['10:20', 'Checks in at site', 'GPS-stamped arrival; the customer gets a WhatsApp update.', 'Field visit'],
    ['11:40', 'Closes the job', 'Photos, parts used and customer signature — the SLA clock stops.', 'Case closure'],
    ['12:00', 'CSAT requested', 'Customer rates the visit; feedback goes straight to the service head.', 'CSAT']] },
  { role: 'HR', initials: 'HR', items: [
    ['09:10', 'Attendance in', 'Biometric punches from every plant already in — no muster to type.', 'Attendance'],
    ['10:00', 'Leave approvals', 'Manager-approved leave waits for the second level, balances shown.', 'Leave'],
    ['14:30', 'Regularisation', 'Missed punches explained and approved with a reason.', 'Regularisation'],
    ['Month end', 'Period close', 'Payroll inputs locked and the payroll journal posted to Tally.', 'Payroll inputs']] },
  { role: 'Accounts', initials: 'AC', items: [
    ['09:00', 'Voucher queue', 'Yesterday\'s invoices already posted to Tally; one parked item to map.', 'Tally sync'],
    ['11:00', 'Payments pulled', 'Receipts from Tally update each distributor\'s outstanding.', 'Outstanding'],
    ['15:00', 'Reconciliation', 'ERP and Tally balances match — differences listed if any.', 'Reconciliation'],
    ['Month end', 'Close gates', 'Checklist turns green; monthly packs are generated and signed.', 'Month-end close']] },
];

/* ── product tour ── */
export const TOUR = [
  { shot: 'dashboard', label: 'MD dashboard', url: 'erp.willet.in / dashboard', cap: 'MD dashboard — today\'s pulse, 12 KPIs against target and exceptions ranked by value.' },
  { shot: 'exceptions', label: 'Exceptions', url: 'erp.willet.in / exceptions', cap: 'Exception feed — overdue dues, credit holds, SLA breaches and stock-outs, ranked by money at stake.' },
  { shot: 'cases', label: 'Service desk', url: 'erp.willet.in / service / cases', cap: 'Service desk — every complaint with its SLA clock, engineer and linked serial number.' },
  { shot: 'approvals', label: 'Approvals', url: 'erp.willet.in / approvals', cap: 'Approvals inbox — every pending decision across purchase, credit, leave and production in one place.' },
  { shot: 'portal', label: 'Partner portal', url: 'partners.willet.in', cap: 'Partner portal — credit, dues, orders and complaints for each distributor at a glance.' },
  { shot: 'portal-order', label: 'Online ordering', url: 'partners.willet.in / orders / new', cap: 'Self-service ordering — the distributor\'s own prices, live availability and one-tap checkout.' },
];

/* ── integrations ── */
export interface Integration { mark: string; tone: 'blue' | 'green' | 'gold' | 'violet'; title: string; status: 'live' | 'ready'; text: string }
export const INTEGRATIONS: Integration[] = [
  { mark: 'T', tone: 'blue', title: 'Tally Prime / ERP 9', status: 'live', text: 'Invoices, credit notes, bills and payroll post automatically; payments and dues flow back.' },
  { mark: 'W', tone: 'green', title: 'WhatsApp Business', status: 'ready', text: 'Order confirmations, dispatch alerts and two-way complaint chat on approved templates.' },
  { mark: '₹', tone: 'gold', title: 'GST e-invoice & e-way bill', status: 'ready', text: 'IRN, QR and e-way bill generated at dispatch through your GSP.' },
  { mark: 'B', tone: 'violet', title: 'Biometric devices', status: 'live', text: 'ZKTeco / eSSL terminals push punches live; offline buffering so nothing is lost.' },
  { mark: '@', tone: 'blue', title: 'Email', status: 'ready', text: 'Your SMTP relay for statements, report packs and case replies — threaded to the record.' },
  { mark: 'X', tone: 'green', title: 'Excel', status: 'live', text: 'Every list exports to Excel; a no-code report builder for anything else.' },
];

/* ── FAQ ── */
export const FAQ: [string, string][] = [
  ['Do we have to stop using Tally?', 'No. Tally stays your books of account. The platform posts invoices, credit notes, purchase bills and the payroll journal into Tally automatically, and pulls payments and outstanding back — so both always agree.'],
  ['Does anyone need to install an app?', 'No. Staff, engineers, customers and distributors all use a normal web browser on a laptop or phone. The screens adapt to the device automatically.'],
  ['Where is our data kept?', 'On your own server, in your office or an Indian data centre. Nightly encrypted backups are built in, with a tested restore script.'],
  ['Can customers see each other\'s data?', 'Never. Each portal user sees only their own company\'s orders, invoices, products and complaints — enforced by the server, not just hidden on screen.'],
  ['How do complaints reach the right engineer?', 'Complaints from the portal, email, WhatsApp or phone are routed by the site\'s PIN code to the right territory and engineer. An SLA clock starts immediately, pauses when waiting on the customer, and escalates before a breach.'],
  ['What about our biometric attendance machines?', 'ZKTeco and eSSL terminals push punches straight to the platform. If the network drops, punches are buffered and sent later — nothing is lost.'],
  ['How long does it take to go live?', 'The software is ready. Go-live is mainly master data (items, customers, opening stock, employees), connecting Tally on the accounts PC, and switching on WhatsApp and e-invoice with your account credentials.'],
  ['Are there per-user licence fees?', 'No. The platform runs on your own server with open technology — add as many staff, engineers and partner users as you need.'],
];
