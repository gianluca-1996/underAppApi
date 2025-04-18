import mongoose from "mongoose";

const userCollection = 'Usuario';

const userSchema = new mongoose.Schema({
    usuario: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true} ,
    password: {type: String, required: true},
    foto_perfil: {type: String},
    foto_portada: {type: String},
    localidad: {type: String, required: true},
    seguidos: {type: [ { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }} ]},
    seguidores: {type: [ { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }} ]},
    //eventos_participados: []
    puntaje: {type: Number, default: 0},
    edad: {type: Number, required: true},
    rol: {type: String, require: true, default: 'basico'},
    created_dt: {type: Date, default: Date.now()}
}, { timestamps: true });

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;