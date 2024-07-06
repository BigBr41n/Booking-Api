import { z } from 'zod';


export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }).max(255, { message: "First name must be at most 255 characters long" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }).max(255, { message: "Last name must be at most 255 characters long" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters long" }).max(15, { message: "Phone number must be at most 15 characters long" }).nullable(),
});


export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Enter your password please" }), // min(1) is used instead of required
});


export const verifyEmailSchema = z.object({
    token: z.string().min(1, { message: "Token is required" }),
});


export const verifyOTPSchema = z.object({
    OTP : z.string().min(8, { message:"please enter a valid OTP"})
});


export const forgotPassSchema = z.object({
    email : z.string().email({ message: "Please enter a valid email"})
}); 


export const resetPassSchema = z.object({
    token : z.string().min(1, { message: "Token is required"}),
    newPassword : z.string().min(8 , { message: "Please enter a valid new password"})
});


export const changePassSchema = z.object({
    userID : z.string(),
    data : z.object({
        oldPassword : z.string().min(8 , { message: "Please enter your current password"}),
        newPassword : z.string().min(8 , { message: "Please enter a new password"})
    })
});


