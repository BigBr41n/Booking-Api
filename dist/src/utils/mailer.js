"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordChangedNotify = exports.sendOTP = exports.sendForgotPassToken = exports.sendEmailVerification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = __importDefault(require("./logger"));
const ApiError_1 = require("./ApiError");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: process.env.SERVICE_EMAIL,
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, //
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    //debug: true, // Enable debug output
    //logger: true, // Log information to console
});
const sendEmailVerification = (email, username, activationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTemplate = ({ activationToken, username }) => {
        return `
      <h1>Welcome to ${process.env.DOMAIN}, ${username}!</h1>
      <p>Click the link below to activate your account:</p>
      <a href="http://${process.env.DOMAIN}/auth/verify?token=${activationToken}">Activate Account</a>
    `;
    };
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Activate Your Account",
        html: emailTemplate({ activationToken, username }),
    };
    try {
        yield transporter.sendMail(mailOptions);
        logger_1.default.info(`Activation email sent to ${email}`);
    }
    catch (err) {
        console.error('Error sending email:', err);
        logger_1.default.error(err);
        throw new ApiError_1.ApiError("Internal server Error", 500);
    }
});
exports.sendEmailVerification = sendEmailVerification;
const sendForgotPassToken = (email, username, activationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTemplate = ({ activationToken, username }) => {
        return `
      <h1>Welcome to ${process.env.DOMAIN}, ${username}!</h1>
      <p>Click the link below to reset your password:</p>
      <a href="http://${process.env.DOMAIN}/auth/verifyResetCode?token=${activationToken}">Reset Password</a>
    `;
    };
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Your Password",
        html: emailTemplate({ activationToken, username }),
    };
    try {
        yield transporter.sendMail(mailOptions);
        logger_1.default.info(`Reset Password sent to  ${email}`);
    }
    catch (err) {
        logger_1.default.error(err);
        throw new ApiError_1.ApiError("Internal server Error", 500);
    }
});
exports.sendForgotPassToken = sendForgotPassToken;
const sendOTP = (email, username, OTP) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTemplate = ({ OTP, username }) => {
        return `
        <h1>Welcome to ${process.env.DOMAIN}, ${username}!</h1>
        <p>Your One Time Password (OTP) is : ${OTP}</p>
      `;
    };
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your Login OTP",
        html: emailTemplate({ OTP, username }),
    };
    try {
        yield transporter.sendMail(mailOptions);
        logger_1.default.info(`OTP sent to  ${email}`);
    }
    catch (err) {
        logger_1.default.error(err);
        throw new ApiError_1.ApiError("Internal server Error", 500);
    }
});
exports.sendOTP = sendOTP;
const passwordChangedNotify = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTemplate = (username) => {
        return `
      <h1>Welcome to ${process.env.DOMAIN}, ${username}!</h1>
      <p>Your Password has been changed , If you believe you didn't change it , please change your password and verify your information</p>
    `;
    };
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Your Password",
        html: emailTemplate(username),
    };
    try {
        yield transporter.sendMail(mailOptions);
        logger_1.default.info(`Reset Password sent to  ${email}`);
    }
    catch (err) {
        logger_1.default.error(err);
        throw new ApiError_1.ApiError("Internal server Error", 500);
    }
});
exports.passwordChangedNotify = passwordChangedNotify;
