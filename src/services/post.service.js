import PostDto from "../dtos/post.dto.js";
import postDao from "../daos/post.dao.js";

class PostService{
    async nuevoPost(idUser, texto){        
        await postDao.nuevoPost({texto: texto, created_dt: Date(), created_id: idUser});
        return {status: 201, payload: 'Post agregado'};
    }

    async getPosts(page){
        return {status: 200, payload: await postDao.getPosts(page)};
    }

    async nuevoComentario(_id, texto, postId){
        const comentario = {usuario: _id, texto, created_dt: new Date()}
        return {status: 201, payload: await postDao.nuevoComentario(postId, comentario)};
    }

    async agregaMeGusta(postId, userId){
        const post = await postDao.getPost(postId);
        return {status: 201, payload: await postDao.agregaMeGusta(postId, userId)};
    }

    async eliminaMeGusta(postId, userId){
        return {status: 200, payload: await postDao.eliminaMeGusta(postId, userId)};
    }

    async getReacciones(postId){
        return {status: 200, payload: await postDao.getReacciones(postId)};
    }

    async eliminaPost(postId){
        const response = await postDao.eliminaPost(postId);
        if(!response) return {status: 400, payload: 'Post no encontrado'};
        return {status: 200, payload: 'Post eliminado'};
    }

    async getPostPropios(page, userId){
        return {status: 200, payload: await postDao.getPostPropios(page, userId)};
    }
}

export default new PostService();