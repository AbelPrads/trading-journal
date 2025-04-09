import mongoose from "mongoose";

const portfolioLogSchema = mongoose.Schema(
  {
    portfolioName: {
      type: String,
      required: true,
    },
    conceptionDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startingCapital: {
      type: Number,
      required: true,
    },
    addedCapital: [
      {
        dateAdded: {
          type: Date,
        },
        amount: {
          type: Number,
        },
      },
    ],
    totalCapital: {
      type: Number,
    },
  },
  {
    timestamps: true, // Enable timestamps here
  }
);

export const Portfolio = mongoose.model('portfolio-log', portfolioLogSchema, 'portfolio-log');