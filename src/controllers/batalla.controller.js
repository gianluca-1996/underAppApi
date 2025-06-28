import batallaService from "../services/batalla.service.js";
import { isValidObjectId } from 'mongoose';

class BatallaController{
    async crearBatalla(req, res){
        try {
            const {nombre, fecha, ubicacion, localidad, premio, coordenadas, cupoMaximo, imagen, descripcion, formato, valorInscripcionPlataforma, valorInscripcionPresencial, inscripcionAbierta, tieneJurados, jurados} = req.body;
            const organizadorId = req.user._id;

            const response = await batallaService.crearBatalla(nombre, fecha, ubicacion, localidad, premio, organizadorId, coordenadas, cupoMaximo, imagen, descripcion, formato, valorInscripcionPlataforma, valorInscripcionPresencial, inscripcionAbierta, tieneJurados, jurados);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getBatallas(req, res){
        try {
            const page = req.query.page ? req.query.page : 1;
            const response = await batallaService.getBatallas(page);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getBatallaDetalle(req, res){
        try {
            const batallaId = req.params.batallaId;
            if(!isValidObjectId(batallaId)) return res.status(400).json({message: 'El id ingresado no posee el formato correcto'});

            const response = await batallaService.getBatallaDetalle(batallaId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getBatallasUsuario(req, res){
        try {
            const userId = req.params.userId;
            const page = req.query.page ? req.query.page : 1 ;
            if(!isValidObjectId(userId)) return res.status(400).json({message: 'El id de usuario ingresado no posee el formato correcto'});
            const response = await batallaService.getBatallasUsuario(userId, page);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }
}

export default new BatallaController();