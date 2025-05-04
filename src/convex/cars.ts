import { query } from "./_generated/server";
import { v } from "convex/values";

// Example data
const cars = [
  { year: 2024, manufacturer: "Toyota", model: "Camry" },
  { year: 2024, manufacturer: "Toyota", model: "Corolla" },
  { year: 2024, manufacturer: "Honda", model: "Civic" },
  { year: 2024, manufacturer: "Honda", model: "Accord" },
  { year: 2023, manufacturer: "Toyota", model: "Camry" },
  { year: 2023, manufacturer: "Toyota", model: "Corolla" },
  { year: 2023, manufacturer: "Honda", model: "Civic" },
  { year: 2023, manufacturer: "Honda", model: "Accord" },
  { year: 2022, manufacturer: "Toyota", model: "Camry" },
  { year: 2022, manufacturer: "Honda", model: "Civic" },
  { year: 2021, manufacturer: "Toyota", model: "Corolla" },
  { year: 2021, manufacturer: "Honda", model: "Accord" },
  { year: 2020, manufacturer: "Toyota", model: "Camry" },
  { year: 2020, manufacturer: "Honda", model: "Civic" },
  { year: 2019, manufacturer: "Toyota", model: "Corolla" },
  { year: 2019, manufacturer: "Honda", model: "Accord" },
];

const parts = [
  { id: "1", name: "Air Filter", price: 15.99, description: "Engine air filter for improved performance", quantity: 45, specs: "Fits all models, Replace every 15,000 miles" },
  { id: "2", name: "Brake Pads", price: 45.99, description: "Front brake pads for reliable stopping", quantity: 32, specs: "Ceramic compound, 50,000 mile warranty" },
  { id: "3", name: "Oil Filter", price: 8.99, description: "Oil filter for engine protection", quantity: 78, specs: "High-flow design, Compatible with synthetic oil" },
  { id: "4", name: "Spark Plugs", price: 12.99, description: "High-performance spark plugs", quantity: 120, specs: "Iridium tips, Pre-gapped to 0.044 inches" },
  { id: "5", name: "Wiper Blades", price: 24.99, description: "All-weather wiper blades", quantity: 54, specs: "Beam-style design, All-weather silicone" }
];

export const getYears = query({
  args: {},
  handler: async (ctx) => {
    const uniqueYears = [...new Set(cars.map(car => car.year))];
    return uniqueYears.sort((a, b) => b - a);
  }
});

export const getManufacturers = query({
  args: { year: v.number() },
  handler: async (ctx, args) => {
    const manufacturers = [...new Set(
      cars
        .filter(car => car.year === args.year)
        .map(car => car.manufacturer)
    )];
    return manufacturers.sort();
  }
});

export const getModels = query({
  args: { 
    year: v.number(),
    manufacturer: v.string()
  },
  handler: async (ctx, args) => {
    const models = [...new Set(
      cars
        .filter(car => 
          car.year === args.year && 
          car.manufacturer === args.manufacturer
        )
        .map(car => car.model)
    )];
    return models.sort();
  }
});

export const getParts = query({
  args: {
    year: v.number(),
    manufacturer: v.string(),
    model: v.string()
  },
  handler: async (ctx, args) => {
    return parts;
  }
});

export const getPart = query({
  args: {
    partId: v.string()
  },
  handler: async (ctx, args) => {
    return parts.find(part => part.id === args.partId) || null;
  }
});
