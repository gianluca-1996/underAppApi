import userModel from "../models/user.model.js";

class UserDao{
    async getUserByEmail(email){
        return await userModel.findOne({email: email}).select('_id usuario password email foto_perfil rol');
    };

    async createUser(usuario){
        return await userModel.create(usuario);
    };

    async getAllUsers(){
        return await userModel.find({});
    };

    async getUserById(id){
        return await userModel.findById(id, {'password': 0, 'created_dt': 0, 'rol': 0, '__v': 0});
    };

    async deleteUserById(id){
        return await userModel.deleteOne({_id: id});
    };
}

export default new UserDao();