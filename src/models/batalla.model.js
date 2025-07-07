import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const coleccionBatalla = 'Batalla';
const batallatSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    fecha: {type: Date, required: true},
    ubicacion: {type: String, required: true},
    localidad: {type: String, index: true, required: true},
    participantesRegistrados: {type: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: false} ], default: []},
    participantesSinRegistrar: {type: Array, default: []},
    premio: {type: String, required: true},
    organizadorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', index: true, required: true},
    coordenadas: {type: {lat: {type: String}, lng: {type: String}}, required: true},
    cupoMaximo: {type: Number, required: true},
    imagen: {type: String, required: false},
    descripcion: {type: String, required: false},
    estado: {type: String, required: true, default: 'Programado'}, //Programado, cancelado, terminado
    formato: {type: String, required: true},
    ganadorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', index: true, required: false},
    valorInscripcionPlataforma: {type: Number, required: true},
    valorInscripcionPresencial: {type: Number, required: true},
    inscripcionAbierta: {type: Boolean},
    jurados: {type: Array, default: []},
    comenzadoBl: {type: Boolean, default: false},
    finalizadoBl: {type: Boolean, default: false}
}, { timestamps: true });

batallatSchema.plugin(mongoosePaginate);

const batallaModel = mongoose.model(coleccionBatalla, batallatSchema);
export default batallaModel;