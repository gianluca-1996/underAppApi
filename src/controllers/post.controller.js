import postService from "../services/post.service.js";

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
            const {texto, postId} = req.body;
            if(!texto) return res.status(400).json('Debe completar el campo texto');
            if(!postId) return res.status(400).json('Debe completar el campo postId');
            const response = await postService.nuevoComentario(req.user._id, texto, postId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async agregarMeGusta(req, res){
        try {
            const response = await postService.agregaMeGusta(req.user._id, req.body.postId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async eliminaMeGusta(req, res){
        try {
            const response = await postService.eliminaMeGusta(req.user._id, req.body.postId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async eliminaPost(req, res){
        try {
            const response = await postService.eliminaPost(req.body.postId);
            res.json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getPostByUserId(req, res){
        try {
            const response = await postService.getPostByUserId((!req.query.page) ? 1 : req.query.page, req.params.userId);
            res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getReacciones(req, res){
        try {
            const response = await postService.getReacciones(req.body.postId);
            res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    }
}

export default new PostController();