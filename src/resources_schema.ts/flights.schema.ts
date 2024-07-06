import { z } from "zod";

export const flightDataSchema = z.object({
  airline: z.string(),
  flightNumber: z.string(),
  departureDate: z.date(),
  arrivalDate: z.date(),
  departureCity: z.string(),
  arrivalCity: z.string(),
  price: z.number(),
  seatsAvailable: z.number(),
  status: z.string(),
});

export const partialFlightDataSchema = flightDataSchema.partial();


export const dateSchema = z.date();


export const airlineSchema = z.string();


export const departureCitySchema = z.string();


export const arrivalCitySchema = z.string();



export const priceRangeSchema = z.object({
    minPrice: z.number(),
    maxPrice: z.number(),
});


export const statusSchema = z.string();


export const seatTypeSchema = z.string();


export const flightIdSchema = z.string();