import { Router } from 'express';
import * as trafficLightCtrl from '../controllers/trafficLightCtrl';

const trafficLightRouter = Router();

trafficLightRouter.get('/', trafficLightCtrl.getMachine)
					.put('/', trafficLightCtrl.makeTransition);

export default trafficLightRouter;
