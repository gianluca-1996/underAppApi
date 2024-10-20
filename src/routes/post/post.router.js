import express from 'express';
import postController from '../../controllers/post.controller.js';
import { authToken, authorization } from '../../middlewares/auth.js';
const postRouter = express.Router();

postRouter.post('/', authToken, postController.nuevoPost);
postRouter.get('/',  authToken, postController.getPosts);

export default postRouter;