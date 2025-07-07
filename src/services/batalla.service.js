import AppError from "../utils/error.js";
import batallaDao from "../daos/batalla.dao.js";

class BatallaService{
    async crearBatalla(nombre, fecha, ubicacion, localidad, premio, organizadorId, coordenadas, cupoMaximo, imagen, descripcion, formato, valorInscripcionPlataforma, valorInscripcionPresencial, inscripcionAbierta, tieneJurados, jurados){
        if(cupoMaximo < 2) throw new AppError('El minimo de participantes debe ser 2', 412);
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

    async editarBatalla(userId, batallaId, batalla){
        if(! userId === batalla.organizadorId) throw new AppError('No tiene permisos para editar esta batalla', 412);
        return await batallaDao.editarBatalla(batallaId, batalla);
    }

    async editarJurados(userId, batallaId, jurados){
        const batalla = await batallaDao.getBatallaDetalle(batallaId);
        if(!batalla) throw new AppError('No se ha encontrado la batalla indicada', 404);
        if(! (userId === batalla.organizadorId._id.toString()) ) throw new AppError('No tiene permisos para editar esta batalla', 412);

        return await batallaDao.editarJurados(batallaId, jurados);
    }
}

export default new BatallaService();