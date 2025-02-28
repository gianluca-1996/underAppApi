import express from 'express';
import postController from '../../controllers/post.controller.js';
import { authToken, authorization } from '../../middlewares/auth.js';
const postRouter = express.Router();

postRouter.post('/', authToken, postController.nuevoPost);
postRouter.get('/',  authToken, postController.getPosts);
postRouter.post('/nuevoComentario', authToken, postController.nuevoComentario);
postRouter.post('/agregaMeGusta', authToken, postController.agregarMeGusta);
postRouter.delete('/eliminaMeGusta/:postId', authToken, postController.eliminaMeGusta);
postRouter.delete('/eliminaPost/:postId', authToken, postController.eliminaPost);
postRouter.get('/getByUserId/:_id', authToken, postController.getPostByUserId);

export default postRouter;