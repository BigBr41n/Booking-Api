import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";
import { generateOTP } from "../utils/generateOTP";
import crypto from 'crypto';

//IMPORT THE PRISMA CLIENT WITH THE MODEL
import { PrismaClient, User } from "@prisma/client";
import { signJwt, signRefreshToken } from "../utils/jwt.utils";
const prisma = new PrismaClient();






/**
 *service to register a new user
 *@param {REGISTER_INPUT} userData - user data needed to register
 *@returns {Promise<User | null>} - The created user document.// TODO : ADD THE USER DOCUMENT TYPE
 *@throws {ApiError} -if the user registration failed
 **/



type REGISTER_INPUT = Omit<
  User,
  "id" | "Bookings" | "Reviews" | "createdAt" | "updatedAt" 
>;


export const signUpService = async (
  userData: REGISTER_INPUT
): Promise<User | null> => {
  try {
    //check for unique emails
    const user = await prisma.user.findFirst({
      where: { email: userData.email },
    });
    if (user) throw new ApiError("Email already  Exists", 401);

    const activationToken = crypto.randomBytes(32).toString("hex");
    const activeExpires = Date.now() + 1000 * 60 * 60;

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: await bcrypt.hash(userData.password, 12),
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber : userData.phoneNumber,
        verificationToken : activationToken ,
        verificationExpires : new Date(activeExpires) ,
      },
    });

    //await sendEmailVerification(userData.email, userData.fistname, activationToken);

    return newUser;

  } catch (err: any) {
    logger.error("Error during sign up service:", err);

    //throw the error to the controller
    if (err instanceof ApiError) throw err;

    throw new ApiError(err, 500);
  }
};








/**
 *service to login a registered user
 *@param {SIGNUP} userData - user data needed to register
 *@returns {Promise<LOGIN | undefined>} - the logged in user with the access token & refresh token
 *@throws {ApiError} -if the user login operation failed
 **/

export const loginService = async (
  userData: {email : string , password : string}
): Promise< string | null> => {
  try {

    const user = await prisma.user.findUnique({where : { email: userData.email }});
    if (!user) {
      throw new ApiError("User not found!", 404);
    }

    if (!user.verified) {
      throw new ApiError("Email not verified!", 401);
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new ApiError("Invalid credentials!", 401);
    }


    const OTP = generateOTP(8);

    //await sentOTP(user.email, user.firstname , OTP), 

    return "please check the OTP sent to your email"

  } catch (err: any) {
    logger.error("Error during login service:", err);

    //throw the error to the controller
    if (err instanceof ApiError) throw err;
    throw new ApiError("Internal Server Error", 500);
  }
};



