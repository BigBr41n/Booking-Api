/*
  Warnings:

  - Added the required column `OTP` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chExpires` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restExpires` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationExpires` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `OTP` VARCHAR(191) NOT NULL,
    ADD COLUMN `chExpires` VARCHAR(191) NOT NULL,
    ADD COLUMN `chToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `resetToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `restExpires` DATETIME(3) NOT NULL,
    ADD COLUMN `verificationExpires` DATETIME(3) NOT NULL,
    ADD COLUMN `verificationToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
