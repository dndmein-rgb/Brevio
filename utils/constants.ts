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


export const containerVariants={
  hidden:{opacity:0},
  visible:{
    opacity:1,
    transition:{
      staggerChildren:0.2,
      delayChildren:0.1
    }
  }
}

export const itemVariants={
  hidden:{opacity:0,y:20},
  visible:{
    opacity:1,
    transition:{
      type:'spring',
      damping:15,
      stiffness:50,
      duration:0.8
    }
  }
} as const