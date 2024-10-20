import postModel from "../models/post.model.js";

class PostDao{
    async nuevoPost(post, session){ return await postModel.create([post], {session}) };
    
    async getPosts(){ return await postModel.find() };
}

export default new PostDao();