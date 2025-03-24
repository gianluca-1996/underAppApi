import { populate } from "dotenv";
import postModel from "../models/post.model.js";

class PostDao{
    async nuevoPost(post){ return await postModel.create(post) };
    
    async getPosts(page){ 
        return await postModel.paginate({}, {limit: 3, page, sort: {created_dt: -1}, populate: [{path: 'comentarios.usuario', select: '_id usuario foto_perfil'},
            {path: 'reacciones.usuario', select: 'usuario foto_perfil'},
            {path: 'created_id', select: 'usuario foto_perfil'}] 
        });
    };

    async getPostById(postId){ 
        return await postModel.findById(postId);
    };

    async nuevoComentario(postId, comentario){ 
        return await postModel.findByIdAndUpdate( 
        postId, 
        {$push: {comentarios: comentario}}, { new: true } ).populate({path: 'comentarios.usuario', select: '_id usuario foto_perfil'}); 
    };

    async agregaMeGusta(_id, postId){
        return await postModel.findByIdAndUpdate( 
            postId, 
            {$push: {reacciones: {usuario: _id}}}, { new: true } ).populate({path: 'reacciones.usuario', select: '_id usuario foto_perfil'}); 
    }

    async eliminaMeGusta(_id, postId){
        return await postModel.findByIdAndUpdate( 
            postId, 
            {$pull: {reacciones: {usuario: _id}}}, { new: true } ).populate({path: 'reacciones.usuario', select: '_id usuario foto_perfil'}); 
    }

    async getPost(postId){
        return await postModel.findById(postId);
    }

    async eliminaPost(postId){
        return await postModel.findByIdAndDelete(postId);
    }

    async getPostByUserId(page, userId){ 
        return await postModel.paginate({created_id: userId}, {limit: 3, page, sort: {created_dt: -1}, populate: [{path: 'comentarios.usuario', select: '_id usuario foto_perfil'},
            {path: 'reacciones.usuario', select: '_id usuario foto_perfil'},
            {path: 'created_id', select: 'usuario foto_perfil'}]
        });
    };

    async tieneMeGusta(_id, postId){ 
        return await postModel.exists( {$and: [{_id: {$eq: postId}}, {'reacciones.usuario': {$eq: _id}}] });
    };

    async getReacciones(postId){
        return await postModel.findById(postId, 'reacciones').populate('reacciones.usuario', '_id usuario foto_perfil');
    }
}

export default new PostDao();