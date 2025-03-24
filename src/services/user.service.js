import userDao from "../daos/user.dao.js";
import { generateToken } from "../middlewares/auth.js";
import bcrypt from 'bcrypt';
import UserDto from "../dtos/user.dto.js";
import mongoose from 'mongoose';
import AppError from "../utils/error.js";

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
            rol: response.rol
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

    async followUser(_id, idUsuarioASeguir){
        const usuarioASeguir = await userDao.getUserById(idUsuarioASeguir);
        if(!usuarioASeguir) throw new AppError('No se ha encontrado el usuario', 404);
        if(usuarioASeguir.seguidores.some(e => e.usuario._id.toString() === _id)) throw new AppError('Ya es seguidor de este usuario', 409);
        
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                await userDao.followUser(_id, usuarioASeguir._id.toString(), session);
            });
            
            return {message: 'Siguiendo'};
        } catch (error) {
            throw new AppError(`Ha ocurrido un error en la base de datos: ${error.message}`, 500);
        }finally{
            session.endSession();
        }
    };

    //TODO: verificar la existencia del usuario a traves de una nueva consulta a la base que devuelva un booleano
    async dejarDeSeguir(_id, idUsuarioSeguido){
        const usuarioSeguido = await userDao.getUserById(idUsuarioSeguido);
        if(!usuarioSeguido) throw new AppError('No se ha encontrado el usuario', 404);
        if(!usuarioSeguido.seguidores.some(e => e.usuario._id.toString() === _id)) throw new AppError('No eres seguidor de este usuario', 409);
        
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                await userDao.dejarDeSeguir(_id, String(idUsuarioSeguido), session);
            });
            
            return {message: 'Ha dejado de seguir al usuario'};
        } catch (error) {
            throw new AppError(`Ha ocurrido un error en la base de datos: ${error.message}`, 500);
        }finally{
            session.endSession();
        }
    };
}

export default new UserService();