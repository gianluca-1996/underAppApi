import express from 'express';
import pantallaController from '../../controllers/pantalla.controller.js';
import { authToken, authorization } from '../../middlewares/auth.js';
const pantallaRouter = express.Router();

pantallaRouter.get('/permitidas', authToken, pantallaController.getPantallasPermitidas);
pantallaRouter.get('/pruebaAuth', authToken, authorization(['prueba', 'gold']), (req, res) => (res.json('mostrando pantalla')));

export default pantallaRouter;