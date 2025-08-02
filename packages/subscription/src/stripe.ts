import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function createCheckoutSession(priceId: string) {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ priceId }),
  });

  const session = await response.json();
  return session;
}

export async function redirectToCheckout(sessionId: string) {
  const stripe = await stripePromise;
  if (!stripe) throw new Error("Stripe not loaded");

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) throw error;
}
