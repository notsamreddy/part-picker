import { query } from "./_generated/server";
import { v } from "convex/values";

export const getYears = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db.query("cars").collect();
    const uniqueYears = [...new Set(cars.map((car) => car.year))];
    return uniqueYears.sort((a, b) => b - a);
  },
});

export const getManufacturers = query({
  args: { year: v.number() },
  handler: async (_ctx, args) => {
    const cars = await _ctx.db.query("cars").collect();
    const manufacturers = [
      ...new Set(
        cars
          .filter((car) => car.year === args.year)
          .map((car) => car.manufacturer)
      ),
    ];
    return manufacturers.sort();
  },
});

export const getModels = query({
  args: {
    year: v.number(),
    manufacturer: v.string(),
  },
  handler: async (_ctx, args) => {
    const cars = await _ctx.db.query("cars").collect();
    const models = [
      ...new Set(
        cars
          .filter(
            (car) =>
              car.year === args.year && car.manufacturer === args.manufacturer
          )
          .map((car) => car.model)
      ),
    ];
    return models.sort();
  },
});

export const getParts = query({
  args: {
    year: v.number(),
    manufacturer: v.string(),
    model: v.string(),
  },
  handler: async (_ctx, _args) => {
    const parts = await _ctx.db.query("parts").collect();
    return parts;
  },
});

export const getPart = query({
  args: {
    partId: v.string(),
  },
  handler: async (_ctx, _args) => {
    const parts = await _ctx.db.query("parts").collect();
    return parts.find((part) => part._id === _args.partId) || null;
  },
});
