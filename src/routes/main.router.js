import express from 'express';
import userRouter from '../routes/user/user.router.js'
import postRouter from './post/post.router.js';
const mainRouter = express.Router();


mainRouter.use('/user', userRouter);
mainRouter.use('/post', postRouter);

export default mainRouter;