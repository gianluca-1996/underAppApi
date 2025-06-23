import batallaModel from "../models/batalla.model.js";

class BatallaDao{
    async crearBatalla(batalla){
        return await batallaModel.create(batalla);
    };
}

export default new BatallaDao();