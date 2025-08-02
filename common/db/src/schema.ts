import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export const schema = defineSchema({
  ...authTables,
  notes: defineTable({
    userId: v.id("users"),
    title: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
  }).index("by_user", ["userId"]),
  subscriptions: defineTable({
    userId: v.id("users"),
    stripeCustomerId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    revenueCatUserId: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("canceled"), v.literal("past_due"), v.literal("trialing")),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
  }).index("by_user", ["userId"]).index("by_stripe_customer", ["stripeCustomerId"]),
});

export default schema;
