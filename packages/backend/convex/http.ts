import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/stripe-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    try {
      const body = await request.text();
      const event = JSON.parse(body);

      if (event.type.startsWith("customer.subscription")) {
        await ctx.runMutation(api.subscriptions.handleStripeWebhook, {
          eventType: event.type,
          customerId: event.data.object.customer,
          subscriptionId: event.data.object.id,
          status: event.data.object.status,
          currentPeriodEnd: event.data.object.current_period_end * 1000,
          cancelAtPeriodEnd: event.data.object.cancel_at_period_end,
        });
      }

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Stripe webhook error:", error);
      return new Response("Error", { status: 400 });
    }
  }),
});

http.route({
  path: "/revenuecat-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      
      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("RevenueCat webhook error:", error);
      return new Response("Error", { status: 400 });
    }
  }),
});

export default http;
