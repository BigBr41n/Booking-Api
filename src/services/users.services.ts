import { ApiError } from "../utils/ApiError";
import bcryptjs from "bcryptjs";

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






export const getUserByIdService = async (userId: string) => {};
export const updateUserInfoService = async (userId: string) => {};
export const updateUserEmailService = async () => {};
export const uploadOrChangeAvatarService = async () => {};
