import postService from "../services/post.service.js";

class PostController{
    async nuevoPost(req, res){
        if(!req.body.texto || req.body.texto.trim() === '') return {status: 400, payload: 'Debe ingresar el texto'};
        try {
            const response = await postService.nuevoPost(req.user._id, req.body.texto);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getPosts(req, res){
        try {
            let page = req.query.page;
            if(!page) page = 1;
            const response = await postService.getPosts(page);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async nuevoComentario(req, res){
        try {
            if(!req.body.texto) return res.status(400).json('Debe completar el campo texto');
            if(!req.body.postId) return res.status(400).json('Debe completar el campo postId');
            const response = await postService.nuevoComentario(req.user._id, req.body.texto, req.body.postId);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async agregarMeGusta(req, res){
        try {
            const response = await postService.agregaMeGusta(req.body.postId, req.user._id);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async eliminaMeGusta(req, res){
        try {
            const response = await postService.eliminaMeGusta(req.params.postId, req.user._id);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getReacciones(req, res){
        try {
            const response = await postService.getReacciones(req.params.postId);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async eliminaPost(req, res){
        try {
            const response = await postService.eliminaPost(req.params.postId);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new PostController();