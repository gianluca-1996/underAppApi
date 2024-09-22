import userService from '../services/user.service.js';

class UserController{

    async login(req, res){
        try {
            if(!req.body.email || !req.body.password) return res.status(400).send('Hay campos sin completar');
            const {email, password} = req.body;
            const response = await userService.login(email, password);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    async createUser(req, res){
        if(!req.body.email) return res.status(400).send('Debe completar el email');
        if(!req.body.password) return res.status(400).send('Debe completar el password');
        if(!req.body.roles) return res.status(400).send('Debe completar el rol');
        if(!Array.isArray(req.body.roles)) return res.status(400).send('Los roles del usuario deben estar indicados dentro de un array. Ejemplo: [\'competidor\']');
        if(!req.body.usuario) return res.status(400).send('Debe completar el usuario');
        if(!req.body.localidad) return res.status(400).send('Debe completar la localidad');
        if(!req.body.edad) return res.status(400).send('Debe completar la edad');
        
        try {
            const response = await userService.createUser(req.body);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    async getAllUsers(req, res){
        try {
            const response = await userService.getAllUsers();
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    async getUserByEmail(req, res){
        if(!req.params.email) return res.status(400).send('Debe completar el email');
        try {
            const response = await userService.getUserByEmail(req.params.email);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    async getUserById(req, res){
        //if(!req.params.id) return res.status(400).send('Debe completar el email');
        try {
            const response = await userService.getUserById(req.user._id);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    async deleteUserById(req, res){
        if(!req.params.id) return res.status(400).send('Debe completar el id');
        try {
            const response = await userService.deleteUserById(req.params.id);
            return res.status(response.status).json(response.payload);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };
} 

export default new UserController();