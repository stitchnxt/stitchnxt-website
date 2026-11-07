/**
 * ============================================================
 *  STITCHNXT PRICING & PLANS  — the ONLY place pricing lives
 * ============================================================
 * The pricing cards, the homepage plan preview, the comparison table and the
 * "Interested plan" dropdown in the enquiry form are ALL generated from this file.
 * Edit it, run `npm run build`, and every page updates.
 *
 * PRICES   monthlyPrice  = the monthly-equivalent rate (number, no symbol, e.g. 999).
 *          annualPrice   = optional. Leave null and the site shows monthlyPrice x 12.
 *                          Set it only for a separately approved annual price (it then wins).
 *          null          = not decided yet -> the site shows a clearly marked placeholder.
 *          All plans are shown as "per month, billed annually". Nothing implies monthly payment.
 *
 * FEATURES Each plan has one entry per feature id listed in `featureGroups` below:
 *            true  = included       false = not included       null = NOT YET CONFIRMED
 *          null is never treated as included; the comparison table shows "TBC" for it.
 *          Feature names are fixed as supplied. To add a short tooltip to a feature,
 *          fill its `hint` (left empty on purpose so nothing is invented).
 *
 * CURRENCY Change `currency` for another country/currency. Prices are formatted automatically.
 *
 * PUBLISHING  Pricing is a "preview" (noindex, banner shown, left out of sitemap.xml) until you set
 *             `pricingReviewed: true` in src/config/site.js. The build prints what is still unconfirmed.
 */
const pricing = {
  currency: { code: 'INR', symbol: '₹', locale: 'en-IN' },

  /** Row order and grouping of the comparison table. */
  featureGroups: [
    {
      id: 'general', title: 'General',
      features: [
        { id: 'dashboard', name: 'Dashboard', hint: '' },
        { id: 'userRolesPermissions', name: 'User Roles & Permissions', hint: '' },
        { id: 'customersManagement', name: 'Customers Management', hint: '' },
        { id: 'supplierManagement', name: 'Supplier Management', hint: '' },
        { id: 'workshopManagement', name: 'Workshop Management', hint: '' },
      ],
    },
    {
      id: 'tailoring', title: 'Tailoring Management',
      features: [
        { id: 'stitchingInvoice', name: 'Stitching Invoice', hint: '' },
        { id: 'measurementSlip', name: 'Measurement Slip (Local Language)', hint: '' },
        { id: 'issueToWorkshop', name: 'Issue to Workshop', hint: '' },
        { id: 'inwardFromWorkshop', name: 'Inward from Workshop', hint: '' },
        { id: 'workshopInvoice', name: 'Workshop Invoice', hint: '' },
        { id: 'workshopAnalytics', name: 'Workshop Analytics', hint: '' },
        { id: 'customerDelivery', name: 'Customer Delivery', hint: '' },
      ],
    },
    {
      id: 'fabricGarment', title: 'Fabric & Garment Management',
      features: [
        { id: 'fabricPurchase', name: 'Fabric Purchase', hint: '' },
        { id: 'fabricInvoices', name: 'Fabric Invoices', hint: '' },
        { id: 'garmentPurchase', name: 'Garment Purchase', hint: '' },
        { id: 'garmentInvoices', name: 'Garment Invoices', hint: '' },
        { id: 'barcodePrinting', name: 'Barcode Printing', hint: '' },
        { id: 'stockInventory', name: 'Stock & Inventory', hint: '' },
      ],
    },
    {
      id: 'accounts', title: 'Accounts Management',
      features: [
        { id: 'receipts', name: 'Receipts', hint: '' },
        { id: 'payments', name: 'Payments', hint: '' },
        { id: 'accountLedger', name: 'Account Ledger', hint: '' },
        { id: 'payableReceivableOutstanding', name: 'Payable / Receivable Outstanding', hint: '' },
      ],
    },
  ],

  /** The three plan groups shown on the Pricing page and the homepage. Each plan's `group` must be one of these ids. */
  planGroups: [
    { id: 'individual', title: 'Individual Plans', blurb: 'Startup plans for a single business type.' },
    { id: 'combo', title: 'Combo Plans', blurb: 'Business plans that combine two or three operations.' },
    { id: 'enterprise', title: 'All-In-One', blurb: 'The Enterprise plan: the complete solution.' },
  ],

  plans: [
    {
      id: 'startup-ts',
      name: 'Startup: TS',
      subtitle: 'Tailor Shop',
      group: 'individual',
      target: 'Tailoring shops and tailoring businesses',
      description: "Everything you need to manage your tailoring business, from customer measurements and stitching invoices to customer delivery.",
      highlighted: false,
      badge: '',
      monthlyPrice: 300,   // ₹ per month, billed annually
      annualPrice: null,    // leave null to use monthlyPrice x 12
      features: {   // true / false / null (not confirmed yet)
        // General
        dashboard: true,
        userRolesPermissions: true,
        customersManagement: true,
        supplierManagement: false,
        workshopManagement: false,
        // Tailoring Management
        stitchingInvoice: true,
        measurementSlip: true,
        issueToWorkshop: false,
        inwardFromWorkshop: false,
        workshopInvoice: false,
        workshopAnalytics: false,
        customerDelivery: true,
        // Fabric & Garment Management
        fabricPurchase: false,
        fabricInvoices: false,
        garmentPurchase: false,
        garmentInvoices: false,
        barcodePrinting: true,
        stockInventory: false,
        // Accounts Management
        receipts: true,
        payments: true,
        accountLedger: true,
        payableReceivableOutstanding: true,
      },
    },
    {
      id: 'startup-fs',
      name: 'Startup: FS',
      subtitle: 'Fabric Shop',
      group: 'individual',
      target: 'Fabric retailers and fabric businesses',
      description: "Manage fabric purchases, fabric invoicing, barcode printing, inventory and business accounts through one integrated application.",
      highlighted: false,
      badge: '',
      monthlyPrice: 300,   // ₹ per month, billed annually
      annualPrice: null,    // leave null to use monthlyPrice x 12
      features: {   // true / false / null (not confirmed yet)
        // General
        dashboard: true,
        userRolesPermissions: true,
        customersManagement: true,
        supplierManagement: true,
        workshopManagement: false,
        // Tailoring Management
        stitchingInvoice: false,
        measurementSlip: false,
        issueToWorkshop: false,
        inwardFromWorkshop: false,
        workshopInvoice: false,
        workshopAnalytics: false,
        customerDelivery: false,
        // Fabric & Garment Management
        fabricPurchase: true,
        fabricInvoices: true,
        garmentPurchase: false,
        garmentInvoices: false,
        barcodePrinting: true,
        stockInventory: true,
        // Accounts Management
        receipts: true,
        payments: true,
        accountLedger: true,
        payableReceivableOutstanding: true,
      },
    },
    {
      id: 'startup-gs',
      name: 'Startup: GS',
      subtitle: 'Garment Shop',
      group: 'individual',
      target: 'Ready-made garment retailers and garment stores',
      description: "Manage garment purchases, sales invoicing, barcode printing, stock and business accounts efficiently.",
      highlighted: false,
      badge: '',
      monthlyPrice: 300,   // ₹ per month, billed annually
      annualPrice: null,    // leave null to use monthlyPrice x 12
      features: {   // true / false / null (not confirmed yet)
        // General
        dashboard: true,
        userRolesPermissions: true,
        customersManagement: true,
        supplierManagement: false,
        workshopManagement: false,
        // Tailoring Management
        stitchingInvoice: false,
        measurementSlip: false,
        issueToWorkshop: false,
        inwardFromWorkshop: false,
        workshopInvoice: false,
        workshopAnalytics: false,
        customerDelivery: false,
        // Fabric & Garment Management
        fabricPurchase: false,
        fabricInvoices: false,
        garmentPurchase: true,
        garmentInvoices: true,
        barcodePrinting: true,
        stockInventory: true,
        // Accounts Management
        receipts: true,
        payments: true,
        accountLedger: true,
        payableReceivableOutstanding: true,
      },
    },
    {
      id: 'business-tw',
      name: 'Business: TW',
      subtitle: 'Tailor + Workshop',
      group: 'combo',
      target: 'Tailoring businesses that run a workshop',
      description: "Manage tailoring together with workshop operations in one integrated application.",
      highlighted: false,
      badge: '',
      monthlyPrice: 400,   // ₹ per month, billed annually
      annualPrice: null,    // leave null to use monthlyPrice x 12
      features: {   // true / false / null (not confirmed yet)
        // General
        dashboard: true,
        userRolesPermissions: true,
        customersManagement: true,
        supplierManagement: false,
        workshopManagement: true,
        // Tailoring Management
        stitchingInvoice: true,
        measurementSlip: true,
        issueToWorkshop: true,
        inwardFromWorkshop: true,
        workshopInvoice: true,
        workshopAnalytics: true,
        customerDelivery: true,
        // Fabric & Garment Management
        fabricPurchase: false,
        fabricInvoices: false,
        garmentPurchase: false,
        garmentInvoices: false,
        barcodePrinting: true,
        stockInventory: false,
        // Accounts Management
        receipts: true,
        payments: true,
        accountLedger: true,
        payableReceivableOutstanding: true,
      },
    },
    {
      id: 'business-tf',
      name: 'Business: TF',
      subtitle: 'Tailor + Fabric',
      group: 'combo',
      target: 'Businesses operating both tailoring services and fabric retail',
      description: "Bring your tailoring operations and fabric business together with one integrated management solution.",
      highlighted: false,
      badge: '',
      monthlyPrice: 400,   // ₹ per month, billed annually
      annualPrice: null,    // leave null to use monthlyPrice x 12
      features: {   // true / false / null (not confirmed yet)
        // General
        dashboard: true,
        userRolesPermissions: true,
        customersManagement: true,
        supplierManagement: true,
        workshopManagement: false,
        // Tailoring Management
        stitchingInvoice: true,
        measurementSlip: true,
        issueToWorkshop: false,
        inwardFromWorkshop: false,
        workshopInvoice: false,
        workshopAnalytics: false,
        customerDelivery: true,
        // Fabric & Garment Management
        fabricPurchase: true,
        fabricInvoices: true,
        garmentPurchase: false,
        garmentInvoices: false,
        barcodePrinting: true,
        stockInventory: true,
        // Accounts Management
        receipts: true,
        payments: true,
        accountLedger: true,
        payableReceivableOutstanding: true,
      },
    },
    {
      id: 'business-tfg',
      name: 'Business: TFG',
      subtitle: 'Tailor + Fabric + Garment',
      group: 'combo',
      target: 'Businesses operating tailoring, fabric and garment retail together',
      description: "Bring tailoring, fabric and garment operations together in one integrated application.",
      highlighted: false,
      badge: '',
      monthlyPrice: 500,   // ₹ per month, billed annually
      annualPrice: null,    // leave null to use monthlyPrice x 12
      features: {   // true / false / null (not confirmed yet)
        // General
        dashboard: true,
        userRolesPermissions: true,
        customersManagement: true,
        supplierManagement: true,
        workshopManagement: false,
        // Tailoring Management
        stitchingInvoice: true,
        measurementSlip: true,
        issueToWorkshop: false,
        inwardFromWorkshop: false,
        workshopInvoice: false,
        workshopAnalytics: false,
        customerDelivery: true,
        // Fabric & Garment Management
        fabricPurchase: true,
        fabricInvoices: true,
        garmentPurchase: true,
        garmentInvoices: true,
        barcodePrinting: true,
        stockInventory: true,
        // Accounts Management
        receipts: true,
        payments: true,
        accountLedger: true,
        payableReceivableOutstanding: true,
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      subtitle: 'All-In-One',
      group: 'enterprise',
      target: 'Businesses that want the complete StitchNXT solution',
      description: "Get complete access to tailoring, fabric and garment business management features in one comprehensive solution.",
      highlighted: true,
      badge: 'Complete Business Solution',
      monthlyPrice: 550,   // ₹ per month, billed annually
      annualPrice: null,    // leave null to use monthlyPrice x 12
      features: {   // true / false / null (not confirmed yet)
        // General
        dashboard: true,
        userRolesPermissions: true,
        customersManagement: true,
        supplierManagement: true,
        workshopManagement: true,
        // Tailoring Management
        stitchingInvoice: true,
        measurementSlip: true,
        issueToWorkshop: true,
        inwardFromWorkshop: true,
        workshopInvoice: true,
        workshopAnalytics: true,
        customerDelivery: true,
        // Fabric & Garment Management
        fabricPurchase: true,
        fabricInvoices: true,
        garmentPurchase: true,
        garmentInvoices: true,
        barcodePrinting: true,
        stockInventory: true,
        // Accounts Management
        receipts: true,
        payments: true,
        accountLedger: true,
        payableReceivableOutstanding: true,
      },
    },
  ],
};

export default pricing;
