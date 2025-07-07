import express from 'express';
import batallaController from '../../controllers/batalla.controller.js';
import { authToken } from '../../middlewares/auth.js';

const batallaRouter = express.Router();

batallaRouter.post('/', authToken, batallaController.crearBatalla);
batallaRouter.get('/', authToken, batallaController.getBatallas);
batallaRouter.get('/:batallaId', authToken, batallaController.getBatallaDetalle);
batallaRouter.get('/usuario/:userId', authToken, batallaController.getBatallasUsuario);
batallaRouter.put('/:batallaId', authToken, batallaController.editarBatalla);
batallaRouter.put('/jurados/:batallaId', authToken, batallaController.editarJurados);

export default batallaRouter;