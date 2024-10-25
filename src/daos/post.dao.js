import postModel from "../models/post.model.js";

class PostDao{
    async nuevoPost(post, session){ return await postModel.create([post], {session}) };
    
    async getPosts(page){ return await postModel.paginate({}, {limit: 3, page}) };
}

export default new PostDao();