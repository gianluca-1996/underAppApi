import postService from "../services/post.service.js";

class PostController{
    async nuevoPost(req, res){
        if(!req.body.texto || req.body.texto.trim() === '') return {status: 400, payload: 'Debe ingresar el texto'};
        try {
            const response = await postService.nuevoPost(req.user._id, req.body.texto);
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getPosts(req, res){
        try {
            const response = await postService.getPosts();
            res.status(response.status).json(response.payload);
        } catch (error) {
            res.status(500).send(error.message);
        }

    }
}

export default new PostController();