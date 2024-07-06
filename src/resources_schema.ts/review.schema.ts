import { z } from 'zod';


export const reviewDataSchema = z.object({
  userId: z.string(),
  flightId: z.string().optional(),
  hotelId: z.string().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});


export const reviewIdSchema = z.string();


export const entityIdSchema = z.string();
export const entityTypeSchema = z.enum(["flight", "hotel"]);


export const userIdSchema = z.string();
