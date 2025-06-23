import batallaService from "../services/batalla.service.js";

class BatallaController{
    async crearBatalla(req, res){
        try {
            const {nombre, fecha, ubicacion, localidad, premio, coordenadas, cupoMaximo, imagen, descripcion, formato} = req.body;
            const organizadorId = req.user._id;

            const response = await batallaService.crearBatalla(nombre, fecha, ubicacion, localidad, premio, organizadorId, coordenadas, cupoMaximo, imagen, descripcion, formato);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }
}

export default new BatallaController();