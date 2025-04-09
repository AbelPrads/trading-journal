import express from "express";
import { Trade } from '../3-models/trade-log.js';
import { Portfolio } from '../3-models/portfolio-log.js';


const dashboardAnalytics = express.Router();

// Fetch All Trades
dashboardAnalytics.get('/total-return', async (request, response) => {
    try{
        const getTotalReturn = await Trade.find(
            { "return": { $ne: null } },
            { "return": 1, "_id": 0 }
          );
          
          const returnValues = getTotalReturn.map(item => item.return);
          const totalReturn = returnValues.reduce((sum, value) => sum + value, 0);
          console.log("Total Return:", totalReturn);

        return response.status(200).json(totalReturn);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }
});

dashboardAnalytics.get('/total-gain-loss', async (request, response) => {
    try{
        const getTotalPercentGainLoss = await Trade.find(
            { "percentGainLoss": { $ne: null } },
            { "percentGainLoss": 1, "_id": 0 }
          );
          
          const returnValues = getTotalPercentGainLoss.map(item => item.percentGainLoss);
          const totalReturn = returnValues.reduce((sum, value) => sum + value, 0);
          console.log("Total Percent Gain Loss:", totalReturn);

        return response.status(200).json(totalReturn);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }
});


dashboardAnalytics.get('/churn-rate', async (request, response) => {
    try{
        const getTotalPercentGainLoss = await Trade.find(
            { "percentGainLoss": { $ne: null } },
            { "percentGainLoss": 1, "_id": 0 }
          );
          
          const returnValues = getTotalPercentGainLoss.map(item => item.percentGainLoss);
          const totalReturn = returnValues.reduce((sum, value) => sum + value, 0);
          console.log("Total Percent Gain Loss:", totalReturn);

        return response.status(200).json(totalReturn);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }
});

dashboardAnalytics.get('/ave-days-held', async (request, response) => {
    try{
        const getTotalPercentGainLoss = await Trade.find(
            { "percentGainLoss": { $ne: null } },
            { "percentGainLoss": 1, "_id": 0 }
          );
          
          const returnValues = getTotalPercentGainLoss.map(item => item.percentGainLoss);
          const totalReturn = returnValues.reduce((sum, value) => sum + value, 0);
          console.log("Total Percent Gain Loss:", totalReturn);

        return response.status(200).json(totalReturn);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }
});

dashboardAnalytics.get('/win-rate', async (request, response) => {
    try {
        const countWin = await Trade.countDocuments({ "status": { $eq: "WIN" } });
        const countLoss = await Trade.countDocuments({ "status": { $eq: "LOSS" } });

        const totalTrades = countWin + countLoss; 

        let winRate = 0;
        if (totalTrades > 0) {
            winRate = (countWin / totalTrades) * 100;
        }

        return response.status(200).json({
            winCount: countWin,
            lossCount: countLoss,
            totalTrades: totalTrades,
            winRate: parseFloat(winRate.toFixed(2)), 
        });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }
});

dashboardAnalytics.get('/days-held', async (request, response) => {
    try {
      // Average days held for WIN trades
      const winStats = await Trade.aggregate([
        {
          $match: { status: { $eq: "WIN" }, createdAt: { $exists: true }, closedDate: { $exists: true } },
        },
        {
          $project: {
            daysHeld: {
              $divide: [
                { $subtract: ["$closedDate", "$createdAt"] },
                1000 * 60 * 60 * 24, // Convert milliseconds to days
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            averageWinDaysHeld: { $avg: "$daysHeld" },
            countWinTrades: { $sum: 1 },
          },
        },
      ]);
  
      // Average days held for LOSS trades
      const lossStats = await Trade.aggregate([
        {
          $match: { status: { $eq: "LOSS" }, createdAt: { $exists: true }, closedDate: { $exists: true } },
        },
        {
          $project: {
            daysHeld: {
              $divide: [
                { $subtract: ["$closedDate", "$createdAt"] },
                1000 * 60 * 60 * 24, // Convert milliseconds to days
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            averageLossDaysHeld: { $avg: "$daysHeld" },
            countLossTrades: { $sum: 1 },
          },
        },
      ]);
  
      const averageWinDaysHeld = winStats.length > 0 ? Math.round(winStats[0].averageWinDaysHeld) : 0;
      const averageLossDaysHeld = lossStats.length > 0 ? Math.round(lossStats[0].averageLossDaysHeld) : 0;
      const countWinTrades = winStats.length > 0 ? winStats[0].countWinTrades : 0;
      const countLossTrades = lossStats.length > 0 ? lossStats[0].countLossTrades : 0;
  
      return response.status(200).json({
        averageWinDaysHeld,
        averageLossDaysHeld,
        countWinTrades,
        countLossTrades,
      });
  
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({
        message: error.message,
      });
    }
  });

  dashboardAnalytics.get('/top-setups', async (request, response) => {
    try {
      const setupOccurrences = await Trade.aggregate([
        {
          $group: {
            _id: '$setup', // Group by the 'setup' field
            count: { $sum: 1 }, // Count the occurrences in each group
          },
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            setup: '$_id', // Rename _id to setup for clarity
            count: 1,
          },
        },
        {
          $sort: { count: -1 }, // Optionally sort by count in descending order
        },
      ]);
  
      return response.status(200).json(setupOccurrences);
  
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({
        message: error.message,
      });
    }
  });

export default dashboardAnalytics;