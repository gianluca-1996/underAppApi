import mongoose from "mongoose";

const coleccionBatalla = 'Batalla';
const batallatSchema = new mongoose.Schema({
    nombre: {type: String, require: true},
    fecha: {type: Date, require: true},
    ubicacion: {type: String, require: true},
    localidad: {type: String, index: true, require: true},
    participantes: {type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' } ], default: []},
    premio: {type: String, require: true},
    organizadorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', index: true, require: true},
    coordenadas: {type: {lat: {type: String}, lng: {type: String}}, require: true},
    cupoMaximo: {type: Number, require: true},
    imagen: {type: String, require: false},
    descripcion: {type: String, require: false},
    estado: {type: String, require: true, default: 'Programado'},
    formato: {type: String, require: true}
});

const batallaModel = mongoose.model(coleccionBatalla, batallatSchema);
export default batallaModel;