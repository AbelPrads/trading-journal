import express from "express";
import { Trade } from '../3-models/trade-log.js';
import { Portfolio } from '../3-models/portfolio-log.js';

const dashboard = express.Router();

// Add Trade    
dashboard.post('/', async (request, response) => {
    try {
        if ( !request.body.status || !request.body.symbol || !request.body.stop || 
             !request.body.avePrice || !request.body.shares || !request.body.side || 
             !request.body.setup || !request.body.remarks
        )  {
            return response.status(400).send({ 
                message: 'Incomplete Entry.',
            });
        }

        const totalValue = request.body.avePrice * request.body.shares;

        const newTrade = {
            status: request.body.status,
            date: null,
            symbol: request.body.symbol,
            stop: request.body.stop,
            avePrice: request.body.avePrice,
            exit: null,
            shares: request.body.shares,
            value: totalValue,
            side: request.body.side,
            return: null,
            percentGainLoss: null,
            setup: request.body.setup,
            remarks: request.body.remarks,
        }

        console.log(newTrade);

        const addTrade = await Trade.create(newTrade);

        return response.status(200).send(addTrade);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ 
            message: error.message 
        });
    }
});

// Fetch All Trades
dashboard.get('/', async (request, response) => {
    try{
        const getAllTrade = await Trade.find({}).sort({ createdAt: -1 });

        return response.status(200).json({
            count: getAllTrade.length,
            data: getAllTrade
        });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }
});

// Fetch a single trade
dashboard.get('/:id', async (request, response) => {
    try{

        const { id } = request.params;

        const fetchTrade = await Trade.findById(id);

        return response.status(200).json(fetchTrade);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }
});

// Update Trade
dashboard.put('/:id', async (request, response) => {
    try{
        if(!request.body) {
            return response.status(400).send({
                message: 'Invalid Update Request: No Update Parameters Provided'
            });
        }

        const { id } = request.params;
        const totalValue = request.body.avePrice * request.body.shares;
        let grossSellingProceeds = null;        
        let totalReturn = null;
        let totalGainLoss = null;

        if(request.body.exit != null) {
            grossSellingProceeds = request.body.exit * request.body.shares;

            const totalFeesAndTaxes = (
                grossSellingProceeds * 0.006 + // Stock Transaction Tax
                grossSellingProceeds * 0.0025 + // Broker's Commission
                grossSellingProceeds * 0.0025 * 0.12 + // VAT on Broker's Commission
                grossSellingProceeds * 0.00005 + // PSE Transaction Fee
                grossSellingProceeds * 0.0001 // SCCP Charges
            );
            
            totalReturn = parseFloat(grossSellingProceeds - totalFeesAndTaxes - totalValue).toFixed(2);

            totalGainLoss = parseFloat(((totalReturn / totalValue) * 100).toFixed(2));
        }

        const updateById = await Trade.findByIdAndUpdate(
            id,
            {
                ...request.body, 
                value: totalValue,
                return: totalReturn,
                percentGainLoss: totalGainLoss
            },
            { new: true }
        );

        if(!updateById) {
            return response.status(400).send({
                message: 'No Trade Found'
            });
        }

        return response.status(200).json({
            updatedTrade: updateById
        });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }

});

// Delete Trade
dashboard.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const deleteById = await Trade.findByIdAndDelete(id)

        if(!deleteById) {
            return response.status(400).send({
                message: 'No Trade Found'
            });
        }

        return response.status(200).send({
            message: 'Trade Successfully Deleted'
        });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }

});


// Add Portfolio    
dashboard.post('/add-portfolio', async (request, response) => {
    try {
        if ( !request.body.portfolioName || !request.body.conceptionDate || !request.body.description || !request.body.startingCapital
        )  {
            return response.status(400).send({ 
                message: 'Incomplete Entry.',
            });
        }

        const newPortfolio = {
            portfolioName: request.body.portfolioName,
            conceptionDate: request.body.conceptionDate,
            description: request.body.description,
            startingCapital: request.body.startingCapital,
            addedCapital: [],
            totalCapital: request.body.startingCapital,
        }

        console.log(newPortfolio);

        const addPortfolio = await Portfolio.create(newPortfolio);

        return response.status(200).send(addPortfolio);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ 
            message: error.message 
        });
    }
});


export default dashboard;