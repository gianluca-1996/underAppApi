import PantallaService from '../services/pantalla.service.js';

class PantallaController{
    async getPantallasPermitidas(req, res){
        try {
            const response = await PantallaService.getPantallasPermitidas(req.user.rol);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new PantallaController();