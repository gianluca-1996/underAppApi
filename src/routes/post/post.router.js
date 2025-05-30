import express from 'express';
import postController from '../../controllers/post.controller.js';
import { authToken, authorization } from '../../middlewares/auth.js';
const postRouter = express.Router();

postRouter.post('/', authToken, postController.nuevoPost);
postRouter.get('/',  authToken, postController.getPosts);
postRouter.delete('/:postId', authToken, postController.eliminaPost);
postRouter.put('/:postId', authToken, postController.editarPost);
postRouter.post('/:postId/comentario', authToken, postController.nuevoComentario);
postRouter.post('/:postId/like', authToken, postController.agregarMeGusta);
postRouter.get('/:postId/like', authToken, postController.getReacciones);
postRouter.delete('/:postId/like', authToken, postController.eliminaMeGusta);
postRouter.get('/getByUserId/:userId', authToken, postController.getPostByUserId);

export default postRouter;