import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";
import { generateOTP } from "../utils/generateOTP";
import crypto from 'crypto';


//IMPORT SEND EMAILS FUNCTIONS : 
import { sendEmailVerification , sendForgotPassToken , sendOTP, passwordChangedNotify } from "../utils/mailer";

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



export type REGISTER_INPUT = Omit<
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

    await sendEmailVerification(userData.email, userData.firstName, activationToken);


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

    await sendOTP(user.email, user.firstName , OTP);

    return "please check the OTP sent to your email"

  } catch (err: any) {
    logger.error("Error during login service:", err);

    //throw the error to the controller
    if (err instanceof ApiError) throw err;
    throw new ApiError("Internal Server Error", 500);
  }
};





/**
 * @param {string} token - The token sent to email
 * @returns {Promise<string | null>} - return a string of email successfully activated
 * @throws {ApiError} -if the user email verification failed
*/



export const verifyEmailService = async (token : string) : Promise<string | null>=>{
  try {
    
    //check if the token is valid
    const checkToken = await prisma.user.findFirst({
      where: {
        verificationToken: token,
      },
    });

    if (!checkToken){
      throw new ApiError("Token invalid", 401);
    }

    //check the time of the token if not invalid
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationExpires: { gt: new Date(Date.now()) },
      },
    });


    //Token expired or Invalid 
    if(!user){
      
      const newToken = crypto.randomBytes(32).toString("hex");
      const activeExpires = Date.now() + 1000 * 60 * 60;

      await prisma.user.update({
        where: { id: checkToken.id },
        data: {
          verificationToken: newToken,
          verificationExpires: new Date(activeExpires),
        },
      });


      sendEmailVerification(checkToken.email , checkToken.firstName , newToken )


      throw new ApiError("Token expired or invalid we sent you a new one", 401);
    }


    //token is valid and email is verified

    await prisma.user.update({
      where : {id : user.id},
      data :{
        verified : true, 
        verificationToken : "",
        verificationExpires : "",
      }
    })


    return "Email verified successfully"
  } catch (err: any) {
    logger.error("Error during verifyEmailService:", err);
    if (err instanceof ApiError) throw err;
    throw new ApiError("Internal Server Error", 500);
  }
}











/**
 * @param {string} OTP - OTP from the email
 * @returns {Promise<Tokens>} - return the access token and the refresh token
 * @throws {ApiError} - if the user OTP verification failed
 */
interface Tokens {
  accessToken: string;
  refreshToken: string;
};

export const verifyOTP = async (OTP: string): Promise<Tokens> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OTP: OTP,
        OTPEx: { gt: new Date() },
      },
    });

    if (!user) {
      throw new ApiError("OTP invalid; please Login Again", 401);
    }

    const accessToken = signJwt(user.id , user.role);
    const refreshToken = signRefreshToken(user.id);

    if (!accessToken || !refreshToken) {
      throw new ApiError("Error creating tokens", 500);
    }

    return { accessToken, refreshToken };
  } catch (err: any) {
    logger.error("Error during verifyOTP:", err);
    if (err instanceof ApiError) throw err;
    throw new ApiError("Internal Server Error", 500);
  }
};








/**
 * @param {string} email - email of the user who forgot his pass
 * @returns {Promise<String>} - return string that confirms the email sent successfully 
 * @throws {ApiError} - if any error internal or by the user
 */

export const forgotPasswordService = async (
  email: string
): Promise<string> => {
  try {
    const user = await prisma.user.findUnique({ where : {email: email}});

    //if no user is found
    if (!user) throw new ApiError("Invalid Email!", 200);

    const changePassToken = crypto.randomBytes(32).toString("hex");
    const changePassTokenExpires = Date.now() + 1000 * 60 * 60;



    await prisma.user.update({where : {
      email: email
    },
    data : {
      resetToken : changePassToken,
      restExpires : new Date(changePassTokenExpires),
   }})


    await sendForgotPassToken(email, user.firstName, changePassToken);

    return "email sent successfully";

  } catch (err: any) {
    logger.error("Error during forgot password service:", err);
    if (err instanceof ApiError) throw err;
    throw new ApiError("Internal Server Error", 500);
  }
};





/**
 *service to rest user password after confirming the token
 *@param {string} token - user token that got from the sent email
 *@param {string} newPassword - the new password of the user account
 *@returns {Promise<boolean >} - if the reset password succeeded sent true 
 *@throws {ApiError} -if any error occurred
**/
export const restPassword = async (
  token: string,
  newPassword: string
): Promise<string> => {
  try {
    const user = await prisma.user.findFirst({where :
       {resetToken : token,
        restExpires: {gt: new Date(Date.now())},
    }});

    if (!user) {
      throw new ApiError("Invalid Token or expired ", 401);
    }


    //update the user password
    await prisma.user.update({where : {id : user.id}, data : {
      password : await bcrypt.hash(newPassword, 12),
      resetToken : "",
      restExpires : "",
    }})


    return "password changed successfully";
  } catch (err: any) {
    logger.error("Error during forgot password conf service:", err);

    //throw the error to the controller
    if (err instanceof ApiError) throw err;
    throw new ApiError("INternal Server Error", 500);
  }
};







/**
 *service to change the logged in user password 
 *@param {PASS} data - user token that got from the sent email
 *@returns {Promise<string>} - acknowledge that password has been changed
 *@throws {ApiError} -if any error occurs throw error to the controller
**/

//types
export interface PASS {
  old: string;
  new: string;
};

export const changePasswordService = async (userID : string , data: PASS): Promise<string> => {
  try {
    if (!data.old || !data.new) {
      throw new ApiError("You must provide both the old and new password", 400);
    }

    const user = await prisma.user.findUnique({where : {id : userID}});

    //if user does not exist
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    //is user exists
    const isMatch = await bcrypt.compare(data.old, user.password);
    if (!isMatch) {
      throw new ApiError("Invalid old password", 401);
    }

    //update the user password
    await prisma.user.update({where : {id : user.id}, data : {
      password : await bcrypt.hash(data.new, 12),
    }})

    await passwordChangedNotify(user.email, user.firstName);

    return "password changed successfully";

    

  } catch (err: any) {
    logger.error("Error during change password service:", err);

    //throw the error to the controller
    if (err instanceof ApiError) throw err;
    throw new ApiError("Internal Server Error", 500);
  }
};







