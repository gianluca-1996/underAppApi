import postDao from "../daos/post.dao.js";
import AppError from "../utils/error.js";

class PostService{
    async nuevoPost(idUser, texto){   
        const response = await postDao.nuevoPost({texto: texto, created_dt: Date(), created_id: idUser});
        return {message: 'Post agregado', data: response};
    }

    async getPosts(page){
        return await postDao.getPosts(page);
    }

    async nuevoComentario(_id, texto, postId){
        const comentario = {usuario: _id, texto, created_dt: new Date()};
        const response = await postDao.nuevoComentario(postId, comentario);
        if(!response) throw new AppError('No se ha encontrado el post', 404);
        return response;
    }

    async agregaMeGusta(_id, postId){
        const post = await postDao.getPostById(postId);
        if(!post) throw new AppError('No se ha encontrado el post', 400);
        const tieneMeGusta = await postDao.tieneMeGusta(_id, postId);
        if(tieneMeGusta) throw new AppError('Este post ya posee su reaccion', 400);
        const response = await postDao.agregaMeGusta(_id, postId);
        return {message: 'Actualizado', data: response};
    }

    async eliminaMeGusta(_id, postId){
        const post = await postDao.getPostById(postId);
        if(!post) throw new AppError('No se ha encontrado el post', 400);
        const tieneMeGusta = await postDao.tieneMeGusta(_id, postId);
        if(!tieneMeGusta) throw new AppError('Este post no posee su reaccion', 400);
        const response = await postDao.eliminaMeGusta(_id, postId);
        return {message: 'Actualizado', data: response};
    }

    async eliminaPost(postId){
        const response = await postDao.eliminaPost(postId);
        if(!response) throw new AppError('Post no encontrado', 404);
        return {message: 'Post eliminado'};
    }

    async getPostByUserId(page, userId){
        return await postDao.getPostByUserId(page, userId);
    }

    async getReacciones(postId){
        const response = await postDao.getReacciones(postId);
        if(!response) throw new AppError('El post indicado no existe', 404);
        return response; 
    }
}

export default new PostService();