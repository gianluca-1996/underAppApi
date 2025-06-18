import userModel from "../models/user.model.js";

class UserDao{
    async getUserByEmail(email){
        return await userModel.findOne({email: email}).select('_id usuario password email foto_perfil foto_portada rol localidad esOrganizador esCompetidor seguidos seguidores');
    };

    async createUser(usuario){
        return await userModel.create(usuario);
    };

    async getAllUsers(){
        return await userModel.find({}, {usuario: 1});
    };

    async getUserById(id){
        return await userModel.findById(id, '_id usuario email localidad foto_perfil foto_portada seguidores esCompetidor esOrganizador seguidos');
    };

    async deleteUserById(id){
        return await userModel.deleteOne({_id: id});
    };

    async actualizarSeguidos(_id, sumar, session){
        await userModel.findByIdAndUpdate(_id, {$inc: {seguidos: sumar ? 1 : -1}}, {session: session});
    }

    async actualizarSeguidores(_id, sumar, session){
        await userModel.findByIdAndUpdate(_id, {$inc: {seguidores: sumar ? 1 : -1}}, {session: session});
    }
}

export default new UserDao();