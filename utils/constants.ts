import { isDev } from "./helpers";

export const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email Support",
    ],
    paymentLink: isDev
      ? "https://buy.stripe.com/test_dRm7sN1S506B2Rm5sd3Ru00"
      : "",
    priceId: isDev ? "price_1TUsAQROnt0WbQ1ArUlreTOL" : "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professional and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority Purchasing",
      "24/7 priority supprot",
      "Markdown expert",
    ],
    paymentLink: isDev
      ? "https://buy.stripe.com/test_3cIeVf68l2eJeA407T3Ru01"
      : "",
    priceId: isDev ? "price_1TUsDVROnt0WbQ1A13Nqwi6i" : "",
  },
];
