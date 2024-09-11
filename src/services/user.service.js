import userDao from "../daos/user.dao.js";
import { generateToken } from "../middlewares/auth.js";
import bcrypt from 'bcrypt';
import UserDto from "../dtos/user.dto.js";

class UserService{
    async login(email, password){
        const response = await userDao.getUserByEmail(email);
        if(!response) return({status: 400, payload: 'Email incorrecto'});
        if(!bcrypt.compareSync(password, response.password)) return({status: 400, payload: 'Contraseña incorrecta'});
        const user = {
            _id: response._id, 
            usuario: response.usuario, 
            email: response.email, 
            foto_perfil: response.foto_perfil
        }
        //crea token
        const token = generateToken(user);
        return ({status: 200, 
            payload: {user, token}}
        );
    };

    async createUser(data){
        const user = await userDao.getUserByEmail(data.email);
        if(user) return({status: 400, payload: 'El email ingresado ya existe'});
        const saltRounds = 10;
        const password = data.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const response = await userDao.createUser({
            usuario: data.usuario, 
            email: data.email, 
            password: hash,
            rol: data.rol,
            localidad: data.localidad,
            edad: data.edad
        });
        return ({status: 200, payload: new UserDto(response)});
    };

    async getAllUsers(){
        const response = await userDao.getAllUsers();
        const usersDto =  [];
        response.forEach(user => {usersDto.push(new UserDto(user))});
        return ({status: 200, payload: usersDto});
    };

    async getUserByEmail(email){
        const response = await userDao.getUserByEmail(email);
        if(!response) return ({status: 404, payload: 'el email ingresado no existe'});
        return ({status: 200, payload: new UserDto(response)});
    };

    async getUserById(id){
        const response = await userDao.getUserById(id);
        if(!response) return ({status: 404, payload: 'el id ingresado no existe'});
        return ({status: 200, payload: new UserDto(response)});
    };
}

export default new UserService();