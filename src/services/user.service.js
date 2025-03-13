import userDao from "../daos/user.dao.js";
import { generateToken } from "../middlewares/auth.js";
import bcrypt from 'bcrypt';
import UserDto from "../dtos/user.dto.js";
import mongoose from 'mongoose';
import AppError from "../utils/error.js";

class UserService{
    async login(email, password){
        const response = await userDao.getUserByEmail(email);
        if(!response) return({status: 400, payload: 'Email incorrecto'});
        if(!bcrypt.compareSync(password, response.password)) return({status: 400, payload: 'Contraseña incorrecta'});
        const user = {
            _id: response._id, 
            usuario: response.usuario, 
            email: response.email, 
            foto_perfil: response.foto_perfil,
            rol: response.rol
        }
        //crea token
        const token = generateToken(user);
        return ({status: 200, 
            payload: {user, token}}
        );
    };

    async createUser(data){
        const user = await userDao.getUserByEmail(data.email);
        if(user) return({status: 400, payload: 'El email ingresado ya existe'});
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
        return ({status: 201, payload: new UserDto(response)});
    };

    async getAllUsers(){
        const response = await userDao.getAllUsers();
        const usersDto =  [];
        response.forEach(user => {usersDto.push(new UserDto(user))});
        return ({status: 200, payload: usersDto});
    };

    async getUserByEmail(email){
        const response = await userDao.getUserByEmail(email);
        if(!response) return ({status: 404, payload: 'el email ingresado no existe'});
        return ({status: 200, payload: response});
    };

    async getUserById(id){
        const response = await userDao.getUserById(id);
        if(!response) return ({status: 404, payload: 'el id ingresado no existe'});
        return ({status: 200, payload: response});
    };

    async deleteUserById(id){
        const userToDelete = await userDao.getUserById(id);
        if(!userToDelete) return ({status: 404, payload: 'El usuario a eliminar no existe'});
        const deletedUser = await userDao.deleteUserById(id);
        if(deletedUser.deletedCount !== 1) return ({status: 404, payload: 'La eliminacion del usuario ha fallado'});
        return ({status: 200, payload: 'Usuario eliminado con éxito'});
    };

    async followUser(idUserLoged, idUserToFollow){
        const userToFollow = await userDao.getUserById(idUserToFollow);
        if(!userToFollow) throw new AppError('No se ha encontrado el usuario', 404);
        if(userToFollow.seguidores.some(e => e.usuario._id.toString() === idUserLoged)) throw new AppError('Ya es seguidor de este usuario', 409);
        
        const session = await mongoose.startSession();
        let response;
        try {
            await session.withTransaction(async () => {
                await userDao.followUser(idUserLoged, userToFollow._id.toString(), session);
                response = {estado: 'PROCESADO', accion: 'ACTUALIZADO'};
            });
            
            return response;
        } catch (error) {
            throw new Error(`Ha ocurrido un error en la base de datos: ${error.message}`);
        }finally{
            session.endSession();
        }
    };

    async dejarDeSeguir(_id, idUsuarioSeguido){
        const usuarioSeguido = await userDao.getUserById(idUsuarioSeguido);
        if(!usuarioSeguido) throw new AppError('No se ha encontrado el usuario', 404);
        if(!usuarioSeguido.seguidores.some(e => e.usuario._id.toString() === _id)) throw new AppError('No eres seguidor de este usuario', 409);
        
        const session = await mongoose.startSession();
        let response;
        try {
            await session.withTransaction(async () => {
                await userDao.dejarDeSeguir(_id, String(idUsuarioSeguido), session);
                response = {estado: 'PROCESADO', accion: 'ACTUALIZADO'};
            });
            
            return response;
        } catch (error) {
            throw new Error(`Ha ocurrido un error en la base de datos: ${error.message}`);
        }finally{
            session.endSession();
        }
    };
}

export default new UserService();