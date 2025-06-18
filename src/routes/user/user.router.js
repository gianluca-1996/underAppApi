import express from 'express';
import userController from '../../controllers/user.controller.js'
import { authToken, authorization } from '../../middlewares/auth.js';
const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.post('/create', userController.createUser);
userRouter.get('/getAllUsers', authToken, userController.getAllUsers);
userRouter.get('/getUserByEmail/:email', authToken, userController.getUserByEmail);
userRouter.get('/getUserById/:_id', authToken, userController.getUserById);
userRouter.delete('/delete/:id', authToken, authorization(['admin']), userController.deleteUserById);
userRouter.get('/getUserByToken', authToken, userController.getUserByToken);
userRouter.post('/:userId/follow', authToken, userController.seguir);
userRouter.post('/:userId/unfollow', authToken, userController.dejarDeSeguir);
userRouter.get('/:userId/getSeguidores', authToken, userController.getSeguidores);
userRouter.get('/:userId/getSeguidos', authToken, userController.getSeguidos);
userRouter.get('/:userId/esSeguidor', authToken, userController.esSeguidor);
userRouter.get('/:userId/esSeguido', authToken, userController.esSeguido);

export default userRouter;