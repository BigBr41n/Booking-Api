import { z } from 'zod';


export const hotelDataSchema = z.object({
  name: z.string(),
  city: z.string(),
  country: z.string(),
  address: z.string(),
  price: z.number(),
  roomsAvailable: z.number(),
  status: z.string(),
});


export const partialHotelDataSchema = hotelDataSchema.partial();


export const updateAvailableRoomsSchema = z.object({
  hotelId: z.string(),
  roomsAvailable: z.number(),
});


export const searchHotelsSchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});


export const hotelIdSchema = z.string();
