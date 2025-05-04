import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
  cars: defineTable({
    year: v.number(),
    manufacturer: v.string(),
    model: v.string(),
  }).index("by_year_manufacturer", ["year", "manufacturer"]),

  parts: defineTable({
    name: v.string(),
    price: v.number(),
    description: v.string(),
    quantity: v.number(),
    specs: v.string(),
  }),
};

export default defineSchema({
  ...applicationTables,
});
