import AppError from "../utils/error.js";
import batallaDao from "../daos/batalla.dao.js";

class BatallaService{
    async crearBatalla(nombre, fecha, ubicacion, localidad, premio, organizadorId, coordenadas, cupoMaximo, imagen, descripcion, formato){
        if(cupoMaximo < 2) throw new AppError('El minimo de participantes debe ser 2');
        
        return await batallaDao.crearBatalla({nombre, fecha, ubicacion, localidad, premio, organizadorId, coordenadas, cupoMaximo, imagen, descripcion, formato});
    }
}

export default new BatallaService();