import pantallaModel from '../models/pantalla.model.js';

class PantallaDao{
    async getPantallasPermitidas(rol){ return await pantallaModel.find({roles_permitidos: rol}, {nombre: 1}) };
}

export default new PantallaDao();