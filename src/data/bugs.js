// Fictional, public-safe examples written against two made-up apps:
//   "ShopLite" — a demo online store (web)
//   "PayGo"    — a demo mobile wallet (Android/iOS)
// No real company, customer or system data. Replace with sanitized real reports if approved.

export const bugReports = [
  {
    id: "BUG-101",
    title: "Checkout accepts an expired card and shows a success page",
    app: "ShopLite (web)",
    environment: "Staging · Chrome (desktop) · Windows 11",
    severity: "Critical",
    priority: "P1",
    status: "Fixed — verified",
    preconditions: [
      "Signed in as a customer with one item in the cart.",
      "Test card with an expiry date in the past (e.g. 01/24).",
    ],
    steps: [
      "Go to Cart and click Checkout.",
      "Enter the shipping address and continue to Payment.",
      "Enter the expired test card and click Place order.",
    ],
    expected:
      "The payment is refused with the message \"This card has expired\" and no order is created.",
    actual:
      "An \"Order confirmed\" page is shown and the order appears in Order history with status Pending payment.",
    notes: "Retested after the fix with valid, expired and blank expiry dates.",
  },
  {
    id: "BUG-102",
    title: "Transfer amount field allows more than two decimal places",
    app: "PayGo (mobile)",
    environment: "QA build · Android 14 · Pixel 7 emulator",
    severity: "Major",
    priority: "P2",
    status: "Open",
    preconditions: ["Signed in with a wallet balance of at least 100.00."],
    steps: [
      "Tap Send money and choose a saved recipient.",
      "Type 10.555 in the Amount field.",
      "Tap Review.",
    ],
    expected: "The field accepts at most two decimals, or the app shows \"Enter a valid amount\".",
    actual: "The review screen shows 10.555 and the Confirm button is enabled.",
    notes: "Same behaviour with a comma as the decimal separator.",
  },
  {
    id: "BUG-103",
    title: "Sign-up button overlaps the terms link on small screens",
    app: "ShopLite (web)",
    environment: "Staging · Safari · iPhone SE viewport (375 × 667)",
    severity: "Minor",
    priority: "P3",
    status: "Fixed — verified",
    preconditions: ["Signed out."],
    steps: ["Open the Sign up page on a 375 px wide screen.", "Scroll to the bottom of the form."],
    expected:
      "The Terms and Privacy links sit above the Create account button, matching the Figma design.",
    actual: "The Create account button covers the Terms link, so it can't be tapped.",
    notes: "Compared against the mobile frame in the approved Figma file.",
  },
  {
    id: "BUG-104",
    title: "Session stays active after password change on another device",
    app: "PayGo (mobile)",
    environment: "QA build · iOS 18 · iPhone 15 simulator + web portal",
    severity: "Major",
    priority: "P2",
    status: "In progress",
    preconditions: ["Same account signed in on the mobile app and the web portal."],
    steps: [
      "On the web portal, change the account password.",
      "Return to the mobile app and pull to refresh the home screen.",
    ],
    expected: "The mobile app signs the user out and asks for the new password.",
    actual: "The mobile app stays signed in and can still send money.",
    notes: "Raised with the developer to confirm the intended session policy.",
  },
];
