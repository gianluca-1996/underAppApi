import batallaModel from "../models/batalla.model.js";

class BatallaDao{
    async crearBatalla(batalla){
        return await batallaModel.create(batalla);
    };

    async getBatallas(page){
        return await batallaModel.paginate({}, {limit: 3, page, sort: {createdAt: -1}, 
            populate: [ {path: 'organizadorId', select: '_id usuario foto_perfil'} ]
        })
    }

    async getBatallaDetalle(batallaId){
        return await batallaModel.findById(batallaId).populate('organizadorId', '_id usuario foto_perfil');
    }

    async getBatallasUsuario(userId, page){
        return await batallaModel.paginate({organizadorId: userId}, {limit: 5, page, sort: {createdAt: -1}, select: 'nombre fecha ubicacion estado'});
    }

    async editarBatalla(batallaId, batalla){
        return await batallaModel.findByIdAndUpdate(batallaId, {...batalla}, {new: true}).populate('organizadorId', '_id usuario foto_perfil');
    }

    async editarJurados(batallaId, jurados){
        return await batallaModel.findByIdAndUpdate(batallaId, {jurados: jurados}, {new: true}).populate('organizadorId', '_id usuario foto_perfil');
    }
}

export default new BatallaDao();