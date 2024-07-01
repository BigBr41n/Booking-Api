-- AlterTable
ALTER TABLE `User` MODIFY `OTP` VARCHAR(191) NULL,
    MODIFY `chExpires` VARCHAR(191) NULL,
    MODIFY `chToken` VARCHAR(191) NULL,
    MODIFY `resetToken` VARCHAR(191) NULL,
    MODIFY `restExpires` DATETIME(3) NULL,
    MODIFY `verificationExpires` DATETIME(3) NULL,
    MODIFY `verificationToken` VARCHAR(191) NULL;
