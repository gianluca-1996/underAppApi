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

    async deleteUserById(id){
        return await userModel.deleteOne({_id: id});
    };

    async asociarPost(idUser, idPost, session){
        return await userModel.updateOne({_id: idUser}, {$push: {posteos: {posteo: idPost}}}, {session});
    }

    async getPosteos(id){ return await userModel.findById(id).populate('posteos.posteo') };
}

export default new UserDao();