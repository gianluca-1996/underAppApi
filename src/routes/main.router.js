import express from 'express';
import userRouter from '../routes/user/user.router.js'
const mainRouter = express.Router();


mainRouter.use('/user', userRouter);

export default mainRouter;