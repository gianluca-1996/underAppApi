import userModel from "../models/user.model.js";
import mongoose from 'mongoose';

class UserDao{
    async getUserByEmail(email){
        return await userModel.findOne({email: email}).select('_id usuario password email foto_perfil rol');
    };

    async createUser(usuario){
        return await userModel.create(usuario);
    };

    async getAllUsers(){
        return await userModel.find({}, {usuario: 1});
    };

    async getUserById(id){
        return await userModel.findById(id, {'password': 0, 'created_dt': 0, 'rol': 0, '__v': 0}, {populate: {path: 'seguidores.usuario', select: '_id usuario foto_perfil'}});
    };

    async deleteUserById(id){
        return await userModel.deleteOne({_id: id});
    };

    async followUser(_id, idUsuarioASeguir, session){        
        await userModel.findByIdAndUpdate(idUsuarioASeguir, {$push: {seguidores: {usuario: _id}}}, {session: session});
        await userModel.findByIdAndUpdate(_id, {$push: {seguidos: {usuario: idUsuarioASeguir}}}, {session: session});
        return;
    };

    async dejarDeSeguir(_id, idUsuarioSeguido, session){        
        await userModel.findByIdAndUpdate(idUsuarioSeguido, {$pull: {seguidores: {usuario: _id}}}, {session: session});
        await userModel.findByIdAndUpdate(_id, {$pull: {seguidos: {usuario: idUsuarioSeguido}}}, {session: session});
        return;
    };
}

export default new UserDao();