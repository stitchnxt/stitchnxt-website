/**
 * FEATURE CONTENT — edit wording here.
 * Only describe capabilities the software actually has.
 * `shot` links a feature to a screenshot category (see screenshots.js).
 */
export const categories = [
  {
    id: 'tailoring',
    title: 'Tailoring Management',
    icon: 'LuScissors',
    blurb: 'From the first customer visit to the final delivery.',
  },
  {
    id: 'customers',
    title: 'Customer Management',
    icon: 'LuUsers',
    blurb: 'Keep every customer’s details and measurements in one place.',
  },
  {
    id: 'inventory',
    title: 'Fabric & Garment Management',
    icon: 'LuBoxes',
    blurb: 'Purchases, stock, barcode labels and sales billing.',
  },
  {
    id: 'accounts',
    title: 'Accounts Management',
    icon: 'LuLandmark',
    blurb: 'Know who owes you, and whom you owe.',
  },
];

export const features = [
  // ---------------- Tailoring ----------------
  {
    slug: 'tailoring-invoice', category: 'tailoring', icon: 'LuReceiptIndianRupee', shot: 'tailoring-invoice',
    title: 'Tailoring Invoice',
    desc: 'Create tailoring invoices for customer orders directly in the application, so every order is recorded and billed in one step.',
    benefit: 'Faster billing and a clear record of every tailoring order.',
    short: 'Create and manage tailoring orders and invoices.',
    related: ['customer-measurements', 'workshop-issue-inward'],
  },
  {
    slug: 'customer-measurements', category: 'tailoring', icon: 'LuRuler', shot: 'customer-measurements',
    title: 'Customer Measurements',
    desc: 'Save and manage each customer’s measurements so they are available the next time that customer visits.',
    benefit: 'No more hunting through notebooks or re-measuring regular customers.',
    short: 'Save and manage measurements for every customer.',
    related: ['customer-information', 'tailoring-invoice'],
  },
  {
    slug: 'workshop-issue-inward', category: 'tailoring', icon: 'LuFactory', shot: 'workshop-management',
    title: 'Workshop Issue & Inward',
    desc: 'Record garments issued to the workshop and note them again when they come back, so you always know where each order stands.',
    benefit: 'Better visibility of what is with the workshop and what is pending.',
    short: 'Track garments issued to and received from the workshop.',
    related: ['workshop-billing', 'customer-delivery'],
  },
  {
    slug: 'workshop-billing', category: 'tailoring', icon: 'LuWallet', shot: 'workshop-billing',
    title: 'Workshop Billing',
    desc: 'Manage billing for the work done by your workshop, connected to the garments you issued and received.',
    benefit: 'Workshop charges stay organized instead of scattered across notes.',
    short: 'Manage billing for workshop work.',
    related: ['workshop-issue-inward', 'payables-outstanding'],
  },
  {
    slug: 'customer-delivery', category: 'tailoring', icon: 'LuTruck', shot: 'customer-delivery',
    title: 'Customer Delivery',
    desc: 'Track pending customer deliveries and record deliveries once garments are handed over.',
    benefit: 'Fewer missed or forgotten deliveries, and easier follow-up with customers.',
    short: 'Track pending and completed customer deliveries.',
    related: ['tailoring-invoice', 'receivables-outstanding'],
  },

  // ---------------- Customers ----------------
  {
    slug: 'customer-information', category: 'customers', icon: 'LuUserPlus', shot: 'customer-measurements',
    title: 'Customer Information',
    desc: 'Register customers and maintain their details in the application.',
    benefit: 'One reliable customer list that the rest of the software works from.',
    short: 'Register and maintain customer details.',
    related: ['customer-records', 'customer-measurements'],
  },
  {
    slug: 'customer-records', category: 'customers', icon: 'LuClipboardList', shot: 'customer-measurements',
    title: 'Customer Records',
    desc: 'Keep a record of each customer’s activity with your shop, available when you need it.',
    benefit: 'Serve returning customers faster with their history at hand.',
    short: 'A record of each customer’s activity.',
    related: ['customer-information', 'customer-account-ledger'],
  },
  {
    slug: 'customer-measurement-records', category: 'customers', icon: 'LuRuler', shot: 'customer-measurements',
    title: 'Customer Measurement Records',
    desc: 'Maintain saved measurement records against each customer for use in future orders.',
    benefit: 'Consistent, reusable measurements for repeat orders.',
    short: 'Saved measurement records for repeat orders.',
    related: ['customer-measurements', 'tailoring-invoice'],
  },
  {
    slug: 'customer-account-information', category: 'customers', icon: 'LuBookOpen', shot: 'accounts-ledger',
    title: 'Customer Account Information',
    desc: 'See account information for each customer alongside their other details.',
    benefit: 'Understand a customer’s account position before you serve them.',
    short: 'Account information alongside customer details.',
    related: ['customer-account-ledger', 'receivables-outstanding'],
  },

  // ---------------- Fabric & Garment ----------------
  {
    slug: 'fabric-purchase', category: 'inventory', icon: 'LuShoppingCart', shot: 'fabric-purchase',
    title: 'Fabric Purchase',
    desc: 'Record fabric purchases from your suppliers so incoming stock is captured properly.',
    benefit: 'Purchases and stock stay connected from the start.',
    short: 'Record fabric purchases from suppliers.',
    related: ['fabric-inventory', 'barcode-printing'],
  },
  {
    slug: 'garment-purchase', category: 'inventory', icon: 'LuShoppingBag', shot: 'garment-purchase',
    title: 'Garment Purchase',
    desc: 'Record ready-made garment purchases from your suppliers.',
    benefit: 'A clear record of what you bought and from whom.',
    short: 'Record ready-made garment purchases.',
    related: ['garment-inventory', 'barcode-printing'],
  },
  {
    slug: 'fabric-invoicing', category: 'inventory', icon: 'LuReceiptIndianRupee', shot: 'fabric-garment-invoicing',
    title: 'Fabric Invoicing',
    desc: 'Create sales invoices for fabric sold to your customers.',
    benefit: 'Quick, organized billing at the fabric counter.',
    short: 'Sales invoices for fabric.',
    related: ['fabric-inventory', 'customer-account-ledger'],
  },
  {
    slug: 'garment-invoicing', category: 'inventory', icon: 'LuReceiptIndianRupee', shot: 'fabric-garment-invoicing',
    title: 'Garment Invoicing',
    desc: 'Create sales invoices for ready-made garments sold in your shop.',
    benefit: 'Quick, organized billing for garment sales.',
    short: 'Sales invoices for garments.',
    related: ['garment-inventory', 'customer-account-ledger'],
  },
  {
    slug: 'fabric-inventory', category: 'inventory', icon: 'LuWarehouse', shot: 'inventory',
    title: 'Fabric Inventory',
    desc: 'Track your fabric stock in the application.',
    benefit: 'See what fabric you have before you promise it to a customer.',
    short: 'Track fabric stock.',
    related: ['fabric-purchase', 'barcode-printing'],
  },
  {
    slug: 'garment-inventory', category: 'inventory', icon: 'LuShirt', shot: 'inventory',
    title: 'Garment Inventory',
    desc: 'Track your ready-made garment stock in the application.',
    benefit: 'Clear stock visibility for your garment shelves and racks.',
    short: 'Track garment stock.',
    related: ['garment-purchase', 'barcode-printing'],
  },
  {
    slug: 'barcode-printing', category: 'inventory', icon: 'LuBarcode', shot: 'barcode-printing',
    title: 'Barcode Printing',
    desc: 'Print barcodes for your fabric and garment items.',
    benefit: 'Label stock once and handle it more consistently.',
    short: 'Print barcodes for fabric and garment items.',
    related: ['fabric-inventory', 'garment-inventory'],
  },

  // ---------------- Accounts ----------------
  {
    slug: 'receivables-outstanding', category: 'accounts', icon: 'LuArrowDownLeft', shot: 'accounts-ledger',
    title: 'Receivables Outstanding',
    desc: 'See the outstanding amounts your customers still need to pay.',
    benefit: 'Follow up on pending payments with confidence.',
    short: 'See what customers still owe you.',
    related: ['customer-account-ledger', 'customer-delivery'],
  },
  {
    slug: 'payables-outstanding', category: 'accounts', icon: 'LuArrowUpRight', shot: 'accounts-ledger',
    title: 'Payables Outstanding',
    desc: 'See the outstanding amounts you still need to pay your suppliers.',
    benefit: 'Plan supplier payments with a clear view of what is due.',
    short: 'See what you still owe suppliers.',
    related: ['supplier-account-ledger', 'fabric-purchase'],
  },
  {
    slug: 'customer-account-ledger', category: 'accounts', icon: 'LuBookOpen', shot: 'accounts-ledger',
    title: 'Customer Account Ledger',
    desc: 'View the account ledger for each customer, including their transactions.',
    benefit: 'A transparent statement to refer to when discussing balances.',
    short: 'Ledger of each customer’s transactions.',
    related: ['receivables-outstanding', 'customer-account-information'],
  },
  {
    slug: 'supplier-account-ledger', category: 'accounts', icon: 'LuBookOpen', shot: 'accounts-ledger',
    title: 'Supplier Account Ledger',
    desc: 'View the account ledger for each supplier, including their transactions.',
    benefit: 'Reconcile with suppliers using a clear transaction record.',
    short: 'Ledger of each supplier’s transactions.',
    related: ['payables-outstanding', 'fabric-purchase'],
  },
];

export const featureBySlug = Object.fromEntries(features.map((f) => [f.slug, f]));

/** Compact groups used by the homepage "Core features" section. */
export const homeGroups = [
  {
    title: 'Tailoring Management',
    icon: 'LuScissors',
    items: [
      ['LuReceiptIndianRupee', 'Tailoring Invoice', 'Bill tailoring orders in the application.'],
      ['LuRuler', 'Customer Measurements', 'Save and reuse each customer’s measurements.'],
      ['LuFactory', 'Workshop Issue & Inward Tracking', 'Know what is with the workshop.'],
      ['LuWallet', 'Workshop Billing', 'Keep workshop charges organized.'],
      ['LuTruck', 'Customer Delivery', 'Track pending deliveries.'],
    ],
  },
  {
    title: 'Fabric & Garment Management',
    icon: 'LuBoxes',
    items: [
      ['LuShoppingCart', 'Fabric Purchase', 'Record fabric bought from suppliers.'],
      ['LuShoppingBag', 'Garment Purchase', 'Record garments bought from suppliers.'],
      ['LuReceiptIndianRupee', 'Fabric & Garment Invoicing', 'Sales invoices for both.'],
      ['LuWarehouse', 'Fabric & Garment Inventory', 'Track stock of fabric and garments.'],
      ['LuBarcode', 'Barcode Printing', 'Print barcodes for your items.'],
    ],
  },
  {
    title: 'Accounts & Financial Management',
    icon: 'LuLandmark',
    items: [
      ['LuArrowDownLeft', 'Receivables Outstanding', 'See what customers owe.'],
      ['LuArrowUpRight', 'Payables Outstanding', 'See what you owe suppliers.'],
      ['LuBookOpen', 'Customer Account Ledger', 'Ledger for each customer.'],
      ['LuBookOpen', 'Supplier Account Ledger', 'Ledger for each supplier.'],
      ['LuListChecks', 'Transaction Tracking', 'Follow account transactions.'],
    ],
  },
];
