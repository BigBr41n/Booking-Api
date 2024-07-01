/*
  Warnings:

  - A unique constraint covering the columns `[OTP]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `OTPEx` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_OTP_key` ON `User`(`OTP`);
