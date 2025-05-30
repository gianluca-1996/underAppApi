import userService from '../services/user.service.js';
import { isValidObjectId } from 'mongoose';

class UserController{

    async login(req, res){
        try {
            if(!req.body.email || !req.body.password) return res.status(400).json({message: 'Hay campos sin completar'});
            const {email, password} = req.body;
            const response = await userService.login(email, password);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async createUser(req, res){
        if(!req.body.email) return res.status(400).json({message: 'Debe completar el email'});
        if(!req.body.password) return res.status(400).json({message: 'Debe completar el password'});
        if(!req.body.usuario) return res.status(400).json({message: 'Debe completar el usuario'});
        if(!req.body.localidad) return res.status(400).json({message: 'Debe completar la localidad'});
        if(!req.body.edad) return res.status(400).json({message: 'Debe completar la edad'});
        if(!req.body.edad < 10) return res.status(400).json({message: 'La edad debe ser mayor o igual a 10'});
        
        try {
            const response = await userService.createUser(req.body);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async getAllUsers(req, res){
        try {
            const response = await userService.getAllUsers();
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async getUserByEmail(req, res){
        if(!req.params.email) return res.status(400).json({message: 'Debe completar el email'});
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(req.params.email)) return res.status(400).json({message: 'Formato de mail incorrecto'});
        try {
            const response = await userService.getUserByEmail(req.params.email);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async getUserById(req, res){
        if(!req.params._id) return res.status(400).json({mensaje: 'Debe completar el id del usuario'});
        if(!isValidObjectId(req.params._id)) return res.status(400).json({message: 'El id ingresado no posee el formato correcto'});

        try {
            const response = await userService.getUserById(req.params._id);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async deleteUserById(req, res){
        if(!req.params.id) return res.status(400).json({message: 'Debe completar el id'});
        try {
            const response = await userService.deleteUserById(req.params.id);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async getUserByToken(req, res){
        try {
            res.json(req.user);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async followUser(req, res){
        const idUserToFollow = req.params.userId;
        if(!isValidObjectId(idUserToFollow)) return res.status(400).json({message: 'El id ingresado no posee el formato correcto'});
        try {
            const response = await userService.followUser(req.user._id, idUserToFollow);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async dejarDeSeguir(req, res){
        const idUsuarioSeguido = req.params.userId;
        if(!idUsuarioSeguido) return res.status(400).json({message: 'Faltan datos de input'});
        if(!isValidObjectId(idUsuarioSeguido)) return res.status(400).json({message: 'El id ingresado no posee el formato correcto'});
        try {
            const response = await userService.dejarDeSeguir(req.user._id, idUsuarioSeguido);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    };

    async esSeguidor(req, res){
        try {
            const response = await userService.esSeguidor(req.user._id, req.params.userId);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async perfilSigueUsuarioLogueado(req, res){
        try {
            const response = await userService.perfilSigueUsuarioLogueado(req.user._id, req.params.userId);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({message: error.message});
        }
    }
} 

export default new UserController();