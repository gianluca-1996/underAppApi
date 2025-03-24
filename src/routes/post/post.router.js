import express from 'express';
import postController from '../../controllers/post.controller.js';
import { authToken, authorization } from '../../middlewares/auth.js';
const postRouter = express.Router();

postRouter.post('/', authToken, postController.nuevoPost);
postRouter.get('/',  authToken, postController.getPosts);
postRouter.post('/nuevoComentario', authToken, postController.nuevoComentario);
postRouter.post('/agregaMeGusta', authToken, postController.agregarMeGusta);
postRouter.delete('/eliminaMeGusta', authToken, postController.eliminaMeGusta);
postRouter.delete('/eliminaPost', authToken, postController.eliminaPost);
postRouter.get('/getByUserId/:userId', authToken, postController.getPostByUserId);
postRouter.get('/reacciones', authToken, postController.getReacciones);

export default postRouter;