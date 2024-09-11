import userModel from "../models/user.model.js";

class UserDao{
    async getUserByEmail(email){
        return await userModel.findOne({email: email});
    };

    async createUser(usuario){
        return await userModel.create(usuario);
    };

    async getAllUsers(){
        return await userModel.find({});
    };

    async getUserById(id){
        return await userModel.findById(id);
    };
}

export default new UserDao();