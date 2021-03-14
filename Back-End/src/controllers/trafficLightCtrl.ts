import {Request, Response} from 'express';
import * as trafficLightService from '../services/trafficLightService';

export const getMachine = async (req: Request, res: Response) => {
    try {
        const data = await trafficLightService.getMachine();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json(err);
    }
};

export const makeTransition = async (req: Request, res: Response) => {
    try {
        const data = await trafficLightService.makeTransition(req.body);
        res.status(201).json(data);
    }
    catch (err) {
        res.status(400).json({message: err && err.message});
    }
};
