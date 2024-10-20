import mongoose from "mongoose";
import PostDto from "../dtos/post.dto.js";
import postDao from "../daos/post.dao.js";
import userDao from "../daos/user.dao.js";

class PostService{
    async nuevoPost(idUser, texto){
        try {
            const user = await userDao.getUserById(idUser);
            const session = await mongoose.startSession();
            await session.withTransaction( async () => {
                const response = await postDao.nuevoPost({texto: texto, created_dt: Date(), created_id: idUser}, session);
                await userDao.asociarPost(user._id, response[0]._id, session);
            });
            session.endSession();
            return {status: 200, payload: 'Nuevo Post agregado'};
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getPosts(){
        const response = await postDao.getPosts();
        return {status: 200, payload: response};
    }
}

export default new PostService();