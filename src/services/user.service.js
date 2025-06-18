import userDao from "../daos/user.dao.js";
import { generateToken } from "../middlewares/auth.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import AppError from "../utils/error.js";
import seguimientoDao from "../daos/seguimiento.dao.js";

class UserService{
    async login(email, password){
        const response = await userDao.getUserByEmail(email);
        if(!response) throw new AppError('Email incorrecto', 400);
        if(!bcrypt.compareSync(password, response.password)) throw new AppError('Contraseña incorrecta', 400);
        const user = {
            _id: response._id, 
            usuario: response.usuario, 
            email: response.email, 
            foto_perfil: response.foto_perfil,
            foto_portada: response.foto_portada,
            rol: response.rol,
            localidad: response.localidad,
            esOrganizador: response.esOrganizador,
            esCompetidor: response.esCompetidor,
            seguidos: response.seguidos,
            seguidores: response.seguidores
        }
        //crea token
        const token = generateToken(user);
        return {user, token};
    };

    async createUser(data){
        const user = await userDao.getUserByEmail(data.email);
        if(user) throw new AppError('El email ingresado ya existe', 400);
        const saltRounds = 10;
        const password = data.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const response = await userDao.createUser({
            usuario: data.usuario, 
            email: data.email, 
            password: hash,
            localidad: data.localidad,
            edad: data.edad,
            foto_perfil: data.foto_perfil && data.foto_perfil
        });
        return response;
    };

    async getAllUsers(){
        const response = await userDao.getAllUsers(); 
        return response;
    };

    async getUserByEmail(email){
        const response = await userDao.getUserByEmail(email);
        if(!response) throw new AppError('el email ingresado no existe', 404);
        return response;
    };

    async getUserById(id){
        const response = await userDao.getUserById(id);
        if(!response) throw new AppError('El id ingresado no existe', 404);
        return response;
    };

    async deleteUserById(id){
        const userToDelete = await userDao.getUserById(id);
        if(!userToDelete) throw new AppError('El usuario a eliminar no existe', 404);
        const deletedUser = await userDao.deleteUserById(id);
        if(deletedUser.deletedCount !== 1) throw new AppError('La eliminacion del usuario ha fallado', 500);
        return {message: 'Usuario Eliminado con éxito'};
    };

    async seguir(_id, seguidoId){
        
        // si es el mismo usuario informar error
        if(_id === seguidoId) throw new AppError('Ambos usuarios son iguales', 412);
        
        // ya es seguidor de el usuario?
        const esSeguidor = await seguimientoDao.esSeguidor(_id, seguidoId);
        if(esSeguidor) throw new AppError('Ya es seguidor de este usuario', 412);
        
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                // 1 - crear el documento, 2 - actualizar el campo de cantidad seguidos del usuario logueado, 
                // 3 - actualizar el campo cantidad seguidores del usuario a seguir
                await seguimientoDao.seguir(seguidoId, _id, session);
                await userDao.actualizarSeguidos(_id, true, session);
                await userDao.actualizarSeguidores(seguidoId, true, session);
            });
            
            return {message: 'Siguiendo'};
        } catch (error) {
            throw new AppError(`Ha ocurrido un error en la base de datos: ${error.message}`, 500);
        }finally{
            session.endSession();
        }
    };

    async dejarDeSeguir(_id, seguidoId){
        // ya es seguidor del usuario?
        const esSeguidor = await seguimientoDao.esSeguidor(_id, seguidoId);
        if(!esSeguidor) throw new AppError('No sigues a este usuario', 412);
        
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                // 1 - eliminar el documento, 2 - actualizar el campo de cantidad seguidos del usuario logueado,
                // 3 - actualizar el campo cantidad seguidores del usuario seguido
                await seguimientoDao.dejarDeseguir(seguidoId, _id, session);
                await userDao.actualizarSeguidos(_id, false, session);
                await userDao.actualizarSeguidores(seguidoId, false, session);
            });
            
            return {message: 'Dejaste de seguir al usuario'};
        } catch (error) {
            throw new AppError(`Ha ocurrido un error en la base de datos: ${error.message}`, 500);
        }finally{
            session.endSession();
        }
    };

    async getSeguidores(_id, page){
        return await seguimientoDao.getSeguidores(_id, page);
    };

    async getSeguidos(_id, page){
        return await seguimientoDao.getSeguidos(_id, page);
    };

    async esSeguidor(_id, seguidorId){
        const esSeguidor = await seguimientoDao.esSeguidor(_id, seguidorId);
        return esSeguidor ? {esSeguidor: true} : {esSeguidor: false};
    };

    async esSeguido(_id, seguidorId){
        const esSeguido = await seguimientoDao.esSeguido(_id, seguidorId);
        return esSeguido ? {esSeguido: true} : {esSeguido: false};
    };

}

export default new UserService();