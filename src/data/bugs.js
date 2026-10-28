// Fictional, public-safe examples written against two made-up apps:
//   "ShopLite" — a demo online store (web) and its Admin panel
//   "PayGo"    — a demo mobile wallet (Android/iOS)
// No real company, customer or system data. Replace with sanitized real reports if approved.
//
// Titles follow my reporting convention:
//   [Test stage][Ticket type][Platform][Product][Module - Submodule] Title In Title Case
// The bracketed prefix is built from `stage`, `type`, `platform`, `product` and `module`.
// `type` is "BUG" or "ENHANCEMENT". `severity` is optional (enhancements usually have none).

export const TITLE_FORMAT = [
  { part: "SIT", meaning: "Test stage — SIT or UAT" },
  { part: "BUG", meaning: "Ticket type — BUG or ENHANCEMENT" },
  { part: "WEB", meaning: "Platform — WEB or MOBILE" },
  { part: "Product", meaning: "Application under test" },
  { part: "Module - Submodule", meaning: "Where the issue lives" },
];

export function ticketPrefix(ticket) {
  return `[${ticket.stage}][${ticket.type}][${ticket.platform}][${ticket.product}][${ticket.module}]`;
}

export const bugReports = [
  {
    id: "BUG-101",
    stage: "SIT",
    type: "BUG",
    platform: "WEB",
    product: "ShopLite Storefront",
    module: "Checkout - Payment",
    title: "Expired Card Is Accepted and an Order Confirmation Is Shown",
    description:
      "In Checkout → Payment, an order can be placed with a card whose expiry date has already " +
      "passed. The order is created and the customer sees a confirmation page, even though the " +
      "payment can never be captured.",
    environment: "SIT · Chrome (desktop) · Windows 11",
    severity: "Critical",
    priority: "P1",
    status: "Fixed — verified",
    preconditions: [
      "Signed in as a customer with one item in the cart.",
      "Test card with an expiry date in the past (e.g. 01/24).",
    ],
    steps: [
      "Log in to ShopLite Storefront.",
      "Go to Cart and click Checkout.",
      "Enter the shipping address and continue to Payment.",
      "Enter the expired test card and click Place order.",
    ],
    actual:
      "An \"Order confirmed\" page is shown and the order appears in Order history with status Pending payment.",
    expected:
      "The payment is refused with the message \"This card has expired\" and no order is created.",
    impact:
      "Customers believe their order went through, and the store holds orders that can never be paid.",
    notes: "Retested after the fix with valid, expired and blank expiry dates.",
  },
  {
    id: "BUG-102",
    stage: "SIT",
    type: "BUG",
    platform: "MOBILE",
    product: "PayGo Wallet",
    module: "Send Money - Amount Entry",
    title: "Amount Field Accepts More Than Two Decimal Places",
    description:
      "In Send Money, the Amount field accepts values with three or more decimal places and " +
      "passes them on to the Review screen.",
    environment: "SIT build · Android 14 · Pixel 7 emulator",
    severity: "Major",
    priority: "P2",
    status: "Open",
    preconditions: ["Signed in with a wallet balance of at least 100.00."],
    steps: [
      "Log in to PayGo Wallet.",
      "Tap Send money and choose a saved recipient.",
      "Type 10.555 in the Amount field.",
      "Tap Review.",
    ],
    actual: "The review screen shows 10.555 and the Confirm button is enabled.",
    expected: "The field accepts at most two decimals, or the app shows \"Enter a valid amount\".",
    impact: "Transfers could be created with amounts the currency can't represent, causing rounding mismatches.",
    notes: "Same behaviour with a comma as the decimal separator.",
  },
  {
    id: "BUG-103",
    stage: "UAT",
    type: "BUG",
    platform: "WEB",
    product: "ShopLite Storefront",
    module: "Account - Sign Up",
    title: "Create Account Button Overlaps the Terms Link on Small Screens",
    description:
      "On small screens, the Create account button on the Sign up page is drawn on top of the " +
      "Terms and Privacy links, which does not match the approved Figma design.",
    environment: "UAT · Safari · iPhone SE viewport (375 × 667)",
    severity: "Minor",
    priority: "P3",
    status: "Fixed — verified",
    preconditions: ["Signed out."],
    steps: ["Open the Sign up page on a 375 px wide screen.", "Scroll to the bottom of the form."],
    actual: "The Create account button covers the Terms link, so it can't be tapped.",
    expected:
      "The Terms and Privacy links sit above the Create account button, matching the Figma design.",
    impact: "Users on small phones can't open the Terms before agreeing to them.",
    notes: "Compared against the mobile frame in the approved Figma file.",
  },
  {
    id: "BUG-104",
    stage: "SIT",
    type: "BUG",
    platform: "MOBILE",
    product: "PayGo Wallet",
    module: "Security - Sessions",
    title: "Session Stays Active After the Password Is Changed on Another Device",
    description:
      "After the account password is changed on the web portal, the mobile app keeps the old " +
      "session and stays fully usable.",
    environment: "SIT build · iOS 18 · iPhone 15 simulator + web portal",
    severity: "Major",
    priority: "P2",
    status: "In progress",
    preconditions: ["Same account signed in on the mobile app and the web portal."],
    steps: [
      "Log in to PayGo on the web portal and in the mobile app.",
      "On the web portal, change the account password.",
      "Return to the mobile app and pull to refresh the home screen.",
    ],
    actual: "The mobile app stays signed in and can still send money.",
    expected: "The mobile app signs the user out and asks for the new password.",
    impact: "If a password is changed because a phone was lost, that phone can still move money.",
    notes: "Raised with the developer to confirm the intended session policy.",
  },
  {
    id: "ENH-101",
    stage: "UAT",
    type: "ENHANCEMENT",
    platform: "WEB",
    product: "ShopLite Admin",
    module: "Order Management - Order Details",
    title: "Change the “Refunded” Status Text Color to Green in Payment Details",
    description:
      "In Order Management → Orders → Order Details → Payment Details, the Refunded status text " +
      "is displayed in grey, the same color used for Cancelled. To make completed refunds easier " +
      "to identify, change the text color of Refunded to green, following the existing status " +
      "color conventions in the system.",
    environment: "UAT · Chrome (desktop) · Windows 11",
    priority: "P3",
    status: "Open",
    preconditions: ["An order with a completed refund exists."],
    steps: [
      "Log in to ShopLite Admin.",
      "Navigate to Order Management → Orders.",
      "Open the details of a refunded order.",
      "Locate the Payment Details section.",
      "Observe the text color of the Refunded status.",
    ],
    actual: "The Refunded status text is displayed in grey.",
    expected:
      "The Refunded status text is displayed in green to show the refund completed and to keep " +
      "status color coding consistent.",
    impact:
      "Admins may confuse refunded orders with cancelled ones because both statuses share the same color.",
  },
];
