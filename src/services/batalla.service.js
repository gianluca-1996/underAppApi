import AppError from "../utils/error.js";
import batallaDao from "../daos/batalla.dao.js";

class BatallaService{
    async crearBatalla(nombre, fecha, ubicacion, localidad, premio, organizadorId, coordenadas, cupoMaximo, imagen, descripcion, formato, valorInscripcionPlataforma, valorInscripcionPresencial, inscripcionAbierta, tieneJurados, jurados){
        if(cupoMaximo < 2) throw new AppError('El minimo de participantes debe ser 2');
        return await batallaDao.crearBatalla({nombre, fecha, ubicacion, localidad, premio, organizadorId, coordenadas, cupoMaximo, imagen, descripcion, formato, valorInscripcionPlataforma, valorInscripcionPresencial, inscripcionAbierta, tieneJurados, jurados});
    }

    async getBatallas(page){
        return await batallaDao.getBatallas(page);
    }

    async getBatallaDetalle(batallaId){
        return await batallaDao.getBatallaDetalle(batallaId);
    }

    async getBatallasUsuario(userId, page){
        return await batallaDao.getBatallasUsuario(userId, page);
    }
}

export default new BatallaService();