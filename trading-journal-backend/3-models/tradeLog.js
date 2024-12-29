import mongoose from "mongoose";

const tradeLogSchema = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        date: {
            type: String,
        },
        symbol: {
            type: String,
            required: true,
        },
        stop: {
            type: Number,
            required: true,
        },
        avePrice: {
            type: Number,
            required: true,
        },
        exit: {
            type: Number,
        },
        shares: {
            type: Number,
            required: true,
        },
        value: {
            type: Number,
        },
        side: {
            type: String,
            required: true,
        },
        return: {
            type: Number,
        },
        percentGainLoss: {
            type: String,
        },
        setup: {
            type: String,
            required: true,
        },
        remarks: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, // Enable timestamps here
    }
);

export const Journal = mongoose.model('tradeLog', tradeLogSchema, 'tradeLog');
