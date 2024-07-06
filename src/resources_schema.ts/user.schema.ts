import { z } from "zod";

const RoleEnum = z.enum(["USER", "MANAGER", "ADMIN"]);

export const getAllUserSchema = z.object({
    role: RoleEnum,
});


export const banUserSchema = z.object({
    userId : z.string({})
});


export const createManagerSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email(),
    phoneNumber : z.string().min(1, { message: "Phone number must be included" }),
    password : z.string().min(8, { message: "Password must be at least 8 characters long" })
})


export const getUserByIdSchema = z.object({
    userId : z.string({})
});



export const updateUserInfoSchema = z.object({
  firstName: z.string().optional(), 
  lastName: z.string().email().optional(),
  poneNUmber : z.string().email().optional(),
});


export const updateUserEmailSchema = z.object({
    userId : z.string().min(1),
    newEmail : z.string().email(),
})

