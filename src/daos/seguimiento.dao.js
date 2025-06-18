import seguimientoModel from "../models/seguimiento.model.js";

class SeguimientoDao{
    async seguir(seguidoId, seguidorId, session){
        return await seguimientoModel.create([{seguido: seguidoId, seguidor: seguidorId}], {session});
    }

    async dejarDeseguir(seguidoId, seguidorId, session){
        return await seguimientoModel.findOneAndDelete({seguidor: seguidorId, seguido: seguidoId}, {session});
    }

    // indica si el usuario logueado es seguidor de otro
    async esSeguidor(_id, seguidoId){
        return await seguimientoModel.exists({seguidor: _id, seguido: seguidoId});
    }

    //indica si el usuario logueado es seguido por otro
    async esSeguido(_id, seguidorId){
        return await seguimientoModel.exists({seguidor: seguidorId, seguido: _id});
    }

    async getSeguidores(_id, page){
        return await seguimientoModel.paginate({seguido: _id}, {limit: 5, page: page, populate: [
            {path: 'seguidor', select: '_id usuario foto_perfil'}
        ]})
    }

    async getSeguidos(_id, page){
        return await seguimientoModel.paginate({seguidor: _id}, {limit: 5, page: page, populate: [
            {path: 'seguido', select: '_id usuario foto_perfil'}
        ]})
    }
}

export default new SeguimientoDao();