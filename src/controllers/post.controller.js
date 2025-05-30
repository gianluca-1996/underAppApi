import postService from "../services/post.service.js";
import { isValidObjectId } from 'mongoose';

class PostController{
    async nuevoPost(req, res){
        if(!req.body.texto || req.body.texto.trim() === '') return res.status(400).json({message:'Debe ingresar el texto'});
        try {
            const response = await postService.nuevoPost(req.user._id, req.body.texto);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getPosts(req, res){
        try {
            let page = req.query.page;
            if(!page) page = 1;
            const response = await postService.getPosts(page);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async nuevoComentario(req, res){
        try {
            const texto = req.body.texto;
            const postId = req.params.postId;
            if(!texto || texto.trim() === '') return res.status(400).json('Debe completar el campo texto');
            
            const post = await postService.getPost(postId);
            if(!post) return res.status(400).json({message: 'Post no encontrado'});
            
            const response = await postService.nuevoComentario(req.user._id, texto, postId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async agregarMeGusta(req, res){
        try {
            const postId = req.params.postId;
            if(!postId) return res.status(400).json({message: 'Debe completar el campo postId'});
            const response = await postService.agregaMeGusta(req.user._id, postId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async eliminaMeGusta(req, res){
        try {
            const postId = req.params.postId;
            if(!postId) res.status(400).json({message: 'Debe completar el campo postId'});
            const response = await postService.eliminaMeGusta(req.user._id, postId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async eliminaPost(req, res){
        try {
            const postId = req.params.postId;
            const post = await postService.getPost(postId);
            if(!post) return res.status(400).json({message: 'Post no encontrado'});

            if(post.created_id.toString() !== req.user._id) return res.status(400).json({message: 'No posee permisos para eliminar este post'});
            
            const response = await postService.eliminaPost(req.user._id, postId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }
    
    async editarPost(req, res){
        try {
            const postId = req.params.postId;
            const texto = req.body.texto;
            if(!texto || texto.trim() === '') return res.status(400).json({message: 'Debe completar el campo texto'});
            
            const post = await postService.getPost(postId);
            if(!post) return res.status(400).json({message: 'Post no encontrado'});

            if(post.created_id.toString() !== req.user._id) return res.status(400).json({message: 'No posee permisos para editar este post'});
            
            const response = await postService.editarPost(postId, texto);
            if(!response) return res.status(500).json({message: 'Error al actualizar el documento'});
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getPostByUserId(req, res){
        const userId = req.params.userId;
        const page = req.query.page ? req.query.page : 1;
        try {
            if(!userId) res.status(400).json({message: 'Debe completar el campo userId'});
            if(!isValidObjectId(userId)) return res.status(400).json({message: 'El id ingresado no posee el formato correcto'});
            const response = await postService.getPostByUserId(page, userId);
            res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    // Por ahora no se usa. Usar este metodo si se van a actualizar las reacciones al momento de hacer click para ver la lista
    async getReacciones(req, res){
        const postId = req.params.postId;
        try {
            if(!postId) res.status(400).json({message: 'Campo postId incompleto'});
            if(!isValidObjectId(postId)) return res.status(400).json({message: 'El id ingresado no posee el formato correcto'});
            const response = await postService.getReacciones(postId);
            res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    }
}

export default new PostController();