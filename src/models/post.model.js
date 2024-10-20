import mongoose from "mongoose";

const coleccionPost = 'Post';

const postSchema = new mongoose.Schema({
    texto: {type: String, require: true},
    reacciones: {type: [ { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' } } ]},
    comentarios: {type: [ { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, texto: {type: String}, created_dt: {type: Date} } ]},
    created_dt: {type: Date, required: true},
    created_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

const postModel = mongoose.model(coleccionPost, postSchema);
export default postModel;