import { ApiError } from "../utils/ApiError";
import bcryptjs from "bcryptjs";
import fs from 'fs'; 
import path from 'path'; 

//PRISMA CLIENT
import { PrismaClient, User } from "@prisma/client";
import logger from "../utils/logger";
const prisma = new PrismaClient();






////////////////////////////*********** SERVICES ONLY FOR THE ADMIN ****************//////////////////




/**
 * Service to get all users by role without sensitive fields
 * @param {Role} role - The role to filter users by
 * @returns {Promise<PublicUser[]>} - The list of users without sensitive fields
 */

// a type that excludes password and verified fields
type PublicUser = Omit<
  User,
  | "password"
  | "OTP"
  | "OTPEx"
  | "resetToken"
  | "restExpires"
  | "chToken"
  | "chExpires"
  | "verificationToken"
  | "verificationExpires"
  | "verified"
>;

export const getAllUsersService = async (
  role: "USER" | "MANAGER"
): Promise<PublicUser[]> => {
  try {
    const allUsers = await prisma.user.findMany({
      where: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        verified: true,
        banned: true,
        avatar: true,
        // exclude sensitive fields
        password: false,
        OTP: false,
        OTPEx: false,
        resetToken: false,
        restExpires: false,
        chToken: false,
        chExpires: false,
        verificationToken: false,
        verificationExpires: false,
      },
    });

    return allUsers as PublicUser[];
  } catch (err: any) {
    logger.error("Error during get all users service:", err);
    throw new ApiError("Failed to fetch users", 500);
  }
};








/**
 * Service to ban a user
 * @param {string} userId - The ID of the user to ban
 * @returns {Promise<void>}
 * @throws {ApiError} - If the user banning fails or the requester lacks permissions
 */
export const banUserService = async (userId: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new ApiError("User not found!", 404);
    }

    // Ban the user by setting the banned field to true
    await prisma.user.update({
      where: { id: userId },
      data: { banned: true },
    });
  } catch (err: any) {
    logger.error("Error during banning user:", err);
    if (err instanceof ApiError) throw err;
    throw new ApiError("Failed to ban user", 500);
  }
};








/**
 * Service to create a new manager
 * @param {MANAGER_DATA} managerData - The manager data needed to register
 * @returns {Promise<User>} - The created manager document
 * @throws {ApiError} - If the manager creation failed
 */

//TYPES
interface MANAGER_DATA {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}


export const createNewManager = async (
  managerData: MANAGER_DATA
): Promise<User> => {
  try {
    // check for unique email
    const existingUser = await prisma.user.findUnique({
      where: { email: managerData.email },
    });
    if (existingUser) {
      throw new ApiError("Email already exists", 401);
    }

    // create the manager
    const newManager = await prisma.user.create({
      data: {
        email: managerData.email,
        password: await bcryptjs.hash(managerData.password, 12),
        firstName: managerData.firstName,
        lastName: managerData.lastName,
        phoneNumber: managerData.phoneNumber,
        role: "MANAGER",
      },
    });

    return newManager;

  } catch (err: any) {
    logger.error("Error during creating new manager:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to create new manager", 500);
  }
};

/////////////////////////////********************************//////////////////////////////











/**
 * Service to fetch a user by ID
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<Partial<User> | null>} - The user object if found, null if not found
 * @throws {ApiError} - If there's an error during database operation
 */
export const getUserByIdService = async (userId: string): Promise<Partial<User> | null> => {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new ApiError("User not found", 404);
      }
  
      const publicUser: Partial<User> = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        verified: user.verified,
        banned: user.banned,
      };
  
      return publicUser;
    } catch (err: any) {
      logger.error("Error during get user by ID service:", err);
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError("Failed to fetch user", 500);
    }
  };











/**
 * Service to update user information
 * @param {string} userId - The ID of the user to update
 * @param {Partial<User>} userInfo - The new user information
 * @returns {Promise<User>} - The updated user document
 * @throws {ApiError} - If the user update fails
 */
export const updateUserInfoService = async (userId: string, userInfo: Partial<User>): Promise<User> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userInfo,
    });

    return updatedUser;

  } catch (err: any) {
    logger.error("Error during updating user info:", err);
    throw new ApiError("Failed to update user info", 500);
  }
};









/**
 * Service to update user email
 * @param {string} userId - The ID of the user to update
 * @param {string} newEmail - The new email address
 * @returns {Promise<User>} - The updated user document
 * @throws {ApiError} - If the user update fails
 */
export const updateUserEmailService = async (userId: string, newEmail: string): Promise<User> => {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { email: newEmail },
      });
  

      //TODO : SEND EMAIL TO VERIFY THE OPERATION

      return updatedUser;
  
    } catch (err: any) {
      logger.error("Error during updating user email:", err);
      throw new ApiError("Failed to update user email", 500);
    }
};









  
interface GraphQLFile {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

/**
 * Service to upload or change user avatar
 * @param {string} userId - The ID of the user to update
 * @param {GraphQLFile} file - The uploaded file
 * @returns {Promise<User>} - The updated user document
 * @throws {ApiError} - If the avatar update fails
 */
export const uploadOrChangeAvatarService = async (
  userId: string,
  file: GraphQLFile
): Promise<User> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError('User not found', 404);

    
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, '../../../uploads/avatars', user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    const { createReadStream, filename } = file;
    const stream = createReadStream();
    const filePath = path.join(__dirname, '../../../uploads/avatars', filename);

    // Ensure the uploads directory exists
    const uploadsDir = path.join(__dirname, '../../../uploads/avatars');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      stream.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Update the user's avatar
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatar: `/avatar/${filename}` },
    });

    return updatedUser;
  } catch (err: any) {
    logger.error('Error during uploading or changing avatar:', err);
    throw new ApiError('Failed to upload or change avatar', 500);
  }
};
  
