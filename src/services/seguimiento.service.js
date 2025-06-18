import mongoose from 'mongoose';
import AppError from "../utils/error";
import seguimientoDao from "../daos/seguimiento.dao";
import userDao from '../daos/user.dao';

class SeguimientoService{
    async seguir(seguidoId, seguidorId){
        // ya es seguidor de el usuario?
        if(seguimientoDao.esSeguidor(seguidoId, seguidorId)) return new AppError('Ya es seguidor de este usuario', 412);
        
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                // 1 - crear el documento, 2 - actualizar el campo de cantidad seguidos del usuario logueado, 
                // 3 - actualizar el campo cantidad seguidores del usuario a seguir
                await seguimientoDao.seguir(seguidoId, seguidorId, session);
                await userDao.actualizarSeguidos(seguidorId, true, session);
                await userDao.actualizarSeguidores(seguidoId, true, session);
            });
            
            return {message: 'Siguiendo'};
        } catch (error) {
            throw new AppError(`Ha ocurrido un error en la base de datos: ${error.message}`, 500);
        }finally{
            session.endSession();
        }
    }

    async dejarDeSeguir(seguidoId, seguidorId){
        // ya es seguidor del usuario?
        if(!seguimientoDao.esSeguidor(seguidoId, seguidorId)) return new AppError('No sigues a este usuario', 412);
        
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                // 1 - eliminar el documento, 2 - actualizar el campo de cantidad seguidos del usuario logueado,
                // 3 - actualizar el campo cantidad seguidores del usuario seguido
                await seguimientoDao.dejarDeseguir(seguidoId, seguidorId, session);
                await userDao.actualizarSeguidos(seguidorId, false, session);
                await userDao.actualizarSeguidores(seguidoId, false, session);
            });
            
            return {message: 'Dejaste de seguir al usuario'};
        } catch (error) {
            throw new AppError(`Ha ocurrido un error en la base de datos: ${error.message}`, 500);
        }finally{
            session.endSession();
        }
    }
}

export default new SeguimientoService();