export const APP_NAME = "IndieStack";
export const APP_DESCRIPTION = "Modern full-stack development template";

export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month" as const,
    features: ["Basic notes", "Up to 10 notes", "Web access"]
  },
  PRO: {
    id: "pro",
    name: "Pro",
    price: 9.99,
    interval: "month" as const,
    features: ["Unlimited notes", "AI summaries", "All platforms", "Priority support"]
  }
};

export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
  APPLE: "apple"
} as const;
