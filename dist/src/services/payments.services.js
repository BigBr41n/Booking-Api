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
exports.confirmPayment = exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const client_1 = require("@prisma/client");
const ApiError_1 = require("../utils/ApiError");
const logger_1 = __importDefault(require("../utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.SECRET_STRIPE, {
    apiVersion: "2024-06-20",
});
const prisma = new client_1.PrismaClient();
const createPaymentIntent = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch booking details from your database
        const booking = yield prisma.booking.findUnique({
            where: { id: bookingId },
            include: { user: true },
        });
        if (!booking) {
            throw new ApiError_1.ApiError("Booking not found", 400);
        }
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: Math.round(booking.totalPrice * 100), // amount in cents
            currency: "usd",
            metadata: { bookingId: booking.id },
        });
        return { clientSecret: paymentIntent.client_secret };
    }
    catch (err) {
        logger_1.default.error("Error creating payment intent");
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to create payment intent", 500);
    }
});
exports.createPaymentIntent = createPaymentIntent;
const confirmPayment = (paymentIntentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === "succeeded") {
            const bookingId = paymentIntent.metadata.bookingId;
            yield prisma.payment.create({
                data: {
                    bookingId,
                    amount: paymentIntent.amount / 100, // convert back to dollars
                    method: "stripe",
                    status: "completed",
                },
            });
            yield prisma.booking.update({
                where: { id: bookingId },
                data: { status: "CONFIRMED" },
            });
            return { success: true };
        }
        else {
            return { error: "Payment was not successful" };
        }
    }
    catch (err) {
        logger_1.default.error("Error creating payment intent");
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to confirm payment intent", 500);
    }
});
exports.confirmPayment = confirmPayment;
