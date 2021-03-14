import { Router } from 'express';
import trafficLightRoute from './trafficLightRoute';

const routes = Router();

routes.use('/trafficLight', trafficLightRoute);

export default routes;
