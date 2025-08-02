import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserSubscription = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    return subscription;
  },
});

export const createSubscription = mutation({
  args: {
    stripeCustomerId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    revenueCatUserId: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("canceled"), v.literal("past_due"), v.literal("trialing")),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not authenticated");

    return await ctx.db.insert("subscriptions", {
      userId,
      ...args,
    });
  },
});

export const updateSubscription = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    status: v.optional(v.union(v.literal("active"), v.literal("canceled"), v.literal("past_due"), v.literal("trialing"))),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
  },
  handler: async (ctx, { subscriptionId, ...updates }) => {
    await ctx.db.patch(subscriptionId, updates);
  },
});

export const handleStripeWebhook = mutation({
  args: {
    eventType: v.string(),
    customerId: v.string(),
    subscriptionId: v.optional(v.string()),
    status: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
  },
  handler: async (ctx, { eventType, customerId, ...data }) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_stripe_customer", (q) => q.eq("stripeCustomerId", customerId))
      .first();

    if (!subscription) return;

    if (eventType === "customer.subscription.updated" || eventType === "customer.subscription.created") {
      await ctx.db.patch(subscription._id, {
        status: data.status as any,
        currentPeriodEnd: data.currentPeriodEnd,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd,
      });
    } else if (eventType === "customer.subscription.deleted") {
      await ctx.db.patch(subscription._id, {
        status: "canceled",
      });
    }
  },
});
