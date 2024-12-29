import express from "express";
import { format } from 'date-fns';
import { Journal } from '../3-models/tradeLog.js';

const route = express.Router();

// Add Trade    
route.post('/', async (request, response) => {
    try {
        if ( !request.body.status || !request.body.symbol || !request.body.stop || 
             !request.body.avePrice || !request.body.shares || !request.body.side || 
             !request.body.setup || !request.body.remarks
        )  {
            return response.status(400).send({ 
                message: 'Incomplete Entry.',
            });
        }

        const formattedDate = format(new Date(), 'MMM dd, yyyy').toUpperCase();
        const totalValue = request.body.avePrice * request.body.shares;

        const newTrade = {
            status: request.body.status,
            date: formattedDate,
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

        const addTrade = await Journal.create(newTrade);

        return response.status(200).send(addTrade);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ 
            message: error.message 
        });
    }
});

// Fetch All Trades
route.get('/', async (request, response) => {
    try{
        const getAllTrade = await Journal.find({});

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
route.get('/:id', async (request, response) => {
    try{

        const { id } = request.params;

        const fetchTrade = await Journal.findById(id);

        return response.status(200).json(fetchTrade);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }
});

// Update Trade
route.put('/:id', async (request, response) => {
    try{
        if(!request.body) {
            return response.status(400).send({
                message: 'Invalid Update Request: No Update Parameters Provided'
            });
        }

        const { id } = request.params;
        const updateById = await Journal.findByIdAndUpdate(id, request.body)

        if(!updateById) {
            return response.status(400).send({
                message: 'No Trade Found'
            });
        }

        return response.status(200).json(updateById);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        });
    }

});

// Delete Trade
route.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const deleteById = await Journal.findByIdAndDelete(id)

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

export default route;