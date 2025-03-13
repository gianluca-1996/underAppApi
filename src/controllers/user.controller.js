import userService from '../services/user.service.js';

class UserController{

    async login(req, res){
        try {
            if(!req.body.email || !req.body.password) return res.status(400).json('Hay campos sin completar');
            const {email, password} = req.body;
            const response = await userService.login(email, password);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    async createUser(req, res){
        if(!req.body.email) return res.status(400).json('Debe completar el email');
        if(!req.body.password) return res.status(400).json('Debe completar el password');
        if(!req.body.usuario) return res.status(400).json('Debe completar el usuario');
        if(!req.body.localidad) return res.status(400).json('Debe completar la localidad');
        if(!req.body.edad) return res.status(400).json('Debe completar la edad');
        
        try {
            const response = await userService.createUser(req.body);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    async getAllUsers(req, res){
        try {
            const response = await userService.getAllUsers();
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    async getUserByEmail(req, res){
        if(!req.params.email) return res.status(400).json('Debe completar el email');
        try {
            const response = await userService.getUserByEmail(req.params.email);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    async getUserById(req, res){
        //if(!req.params.id) return res.status(400).send('Debe completar el email');
        try {
            const response = await userService.getUserById(req.params._id);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    async deleteUserById(req, res){
        if(!req.params.id) return res.status(400).json('Debe completar el id');
        try {
            const response = await userService.deleteUserById(req.params.id);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    async getUserByToken(req, res){
        try {
            res.json({payload: req.user});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    async followUser(req, res){
        if(!req.body.idUserToFollow) return res.status(400).json({message: 'Debe completar el id'});
        try {
            const response = await userService.followUser(req.user._id, req.body.idUserToFollow);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json(error.message);
        }
    };

    async dejarDeSeguir(req, res){
        if(!req.body.idUsuarioSeguido) return res.status(400).json('Faltan datos de input');
        try {
            const response = await userService.dejarDeSeguir(req.user._id, req.body.idUsuarioSeguido);
            return res.json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json(error.message);
        }
    };
} 

export default new UserController();