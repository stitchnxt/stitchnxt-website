/**
 * PRODUCT SCREENSHOTS — how to add real screenshots
 * -------------------------------------------------
 * 1. Save the PNG/JPG/WebP in  public/assets/screenshots/
 * 2. Set `file` below to that file name (e.g. 'dashboard.png').
 * 3. Run `npm run build`.
 *
 * Entries WITHOUT an existing file automatically render a clearly labelled
 * "Screenshot to be added" placeholder. No fake interface is ever shown as a
 * real screenshot.
 *
 * To add MORE screenshots later, just append another object to `screenshots`
 * using any existing `category` id (or add a new category). The Home gallery,
 * Product Tour page, filters and lightbox update automatically.
 *
 * Recommended size: 1600 × 1000 px (16:10). Other ratios are shown whole
 * (never cropped) inside the same frame.
 */
export const shotCategories = [
  { id: 'dashboard', label: 'Dashboard', group: 'Overview' },
  { id: 'tailoring-invoice', label: 'Tailoring Invoice', group: 'Tailoring' },
  { id: 'customer-measurements', label: 'Customer Measurements', group: 'Tailoring' },
  { id: 'workshop-management', label: 'Workshop Management', group: 'Tailoring' },
  { id: 'workshop-billing', label: 'Workshop Billing', group: 'Tailoring' },
  { id: 'customer-delivery', label: 'Customer Delivery', group: 'Tailoring' },
  { id: 'fabric-purchase', label: 'Fabric Purchase', group: 'Fabric & Garment' },
  { id: 'garment-purchase', label: 'Garment Purchase', group: 'Fabric & Garment' },
  { id: 'fabric-garment-invoicing', label: 'Fabric & Garment Invoicing', group: 'Fabric & Garment' },
  { id: 'barcode-printing', label: 'Barcode Printing', group: 'Fabric & Garment' },
  { id: 'inventory', label: 'Inventory', group: 'Fabric & Garment' },
  { id: 'accounts-ledger', label: 'Accounts & Ledger', group: 'Accounts' },
];

export const screenshots = [
  { category: 'dashboard', title: 'Dashboard', file: '', caption: 'Your starting point for everyday shop operations.', feature: 'Overview' },
  { category: 'tailoring-invoice', title: 'Tailoring Invoice', file: '', caption: 'Create and manage tailoring invoices for customer orders.', feature: 'Tailoring Management' },
  { category: 'customer-measurements', title: 'Customer Measurements', file: '', caption: 'Save and manage customer measurements.', feature: 'Tailoring Management' },
  { category: 'workshop-management', title: 'Workshop Issue & Inward', file: '', caption: 'Track garments issued to and received from the workshop.', feature: 'Tailoring Management' },
  { category: 'workshop-billing', title: 'Workshop Billing', file: '', caption: 'Manage billing for workshop work.', feature: 'Tailoring Management' },
  { category: 'customer-delivery', title: 'Customer Delivery', file: '', caption: 'Track pending and completed customer deliveries.', feature: 'Tailoring Management' },
  { category: 'fabric-purchase', title: 'Fabric Purchase', file: '', caption: 'Record fabric purchases from suppliers.', feature: 'Fabric & Garment Management' },
  { category: 'garment-purchase', title: 'Garment Purchase', file: '', caption: 'Record garment purchases from suppliers.', feature: 'Fabric & Garment Management' },
  { category: 'fabric-garment-invoicing', title: 'Fabric & Garment Invoicing', file: '', caption: 'Create sales invoices for fabric and garments.', feature: 'Fabric & Garment Management' },
  { category: 'barcode-printing', title: 'Barcode Printing', file: '', caption: 'Print barcodes for fabric and garment items.', feature: 'Fabric & Garment Management' },
  { category: 'inventory', title: 'Inventory', file: '', caption: 'Track fabric and garment stock.', feature: 'Fabric & Garment Management' },
  { category: 'accounts-ledger', title: 'Accounts & Ledger', file: '', caption: 'Receivables, payables and account ledgers.', feature: 'Accounts Management' },
];
