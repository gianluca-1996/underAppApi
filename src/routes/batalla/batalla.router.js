import express from 'express';
import batallaController from '../../controllers/batalla.controller.js';
import { authToken } from '../../middlewares/auth.js';

const batallaRouter = express.Router();

batallaRouter.post('/', authToken, batallaController.crearBatalla);

export default batallaRouter;