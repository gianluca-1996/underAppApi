import express from 'express';
import userRouter from './user/user.router.js'
import postRouter from './post/post.router.js';
import pantallaRouter from './pantalla/pantalla.router.js'
import batallaRouter from './batalla/batalla.router.js';

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/post', postRouter);
mainRouter.use('/pantalla', pantallaRouter);
mainRouter.use('/batalla', batallaRouter);

export default mainRouter;