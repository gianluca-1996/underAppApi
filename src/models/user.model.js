import mongoose from "mongoose";

const userCollection = 'Usuario';

const userSchema = new mongoose.Schema({
    usuario: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true} ,
    password: {type: String, required: true},
    foto_perfil: {type: String},
    foto_portada: {type: String},
    localidad: {type: String, required: true},
    seguidos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}],
    seguidores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}],
    //eventos_participados: []
    posteos: {type: [ { posteo:{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' } } ], default: []},
    puntaje: {type: Number, default: 0},
    edad: {type: Number, required: true},
    created_at: {type: Date, default: Date.now()}
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;