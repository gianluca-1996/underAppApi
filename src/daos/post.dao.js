import postModel from "../models/post.model.js";

class PostDao{
    async nuevoPost(post){ return await postModel.create(post) };
    
    async getPosts(page){ 
        return await postModel.paginate({}, {limit: 3, page, sort: {created_dt: -1}, populate: {path: 'comentarios.usuario', select: '_id usuario foto_perfil'} });
    };

    async nuevoComentario(postId, comentario){ 
        return await postModel.findByIdAndUpdate( 
        postId, 
        {$push: {comentarios: comentario}}, { new: true } ).populate({path: 'comentarios.usuario', select: '_id usuario foto_perfil'}); 
    };

    async agregaMeGusta(postId, userId){
        return await postModel.findByIdAndUpdate( 
            postId, 
            {$push: {reacciones: {usuario: userId}}}, { new: true } ).populate({path: 'reacciones.usuario', select: '_id usuario foto_perfil'}); 
    }

    async eliminaMeGusta(postId, userId){
        return await postModel.findByIdAndUpdate( 
            postId, 
            {$pull: {reacciones: {usuario: userId}}}, { new: true } ).populate({path: 'reacciones.usuario', select: '_id usuario foto_perfil'}); 
    }

    async getPost(postId){
        return await postModel.findById(postId);
    }

    async getReacciones(postId){
        return await postModel.findById(postId, 'reacciones');
    }

    async eliminaPost(postId){
        return await postModel.findByIdAndDelete(postId);
    }    
}

export default new PostDao();