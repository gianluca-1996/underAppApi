import postDao from "../daos/post.dao.js";
import AppError from "../utils/error.js";

class PostService{
    async nuevoPost(idUser, texto){   
        const response = await postDao.nuevoPost({texto: texto, created_id: idUser});
        return {message: 'Post agregado', data: response};
    }

    async getPosts(page){
        return await postDao.getPosts(page);
    }

    async getPost(postId){
        return await postDao.getPost(postId);
    }

    async nuevoComentario(_id, texto, postId){
        const comentario = {usuario: _id, texto, createdAt: new Date()};
        return await postDao.nuevoComentario(postId, comentario);
    }

    async agregaMeGusta(_id, postId){
        const post = await postDao.getPostById(postId);
        if(!post) throw new AppError('No se ha encontrado el post indicado', 400);
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

    async eliminaPost(_id, postId){
        const post = await postDao.getPost(postId);
        if(post.created_id != _id) throw new AppError('No posee permisos para eliminar este recurso', 401);
        const response = await postDao.eliminaPost(postId);
        if(!response) throw new AppError('Post no encontrado', 404);
        return {message: 'Post eliminado'};
    }

    async editarPost(postId, texto){
        return await postDao.editarPost(postId, texto);
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