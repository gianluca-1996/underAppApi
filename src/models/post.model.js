import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const coleccionPost = 'Post';

const postSchema = new mongoose.Schema({
    texto: {type: String, require: true},
    reacciones: {type: [ { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' } } ]},
    comentarios: {type: [ { usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, texto: {type: String}, createdAt: {type: Date} } ]},
    created_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'} // TODO: crear indice
}, { timestamps: true });

postSchema.plugin(mongoosePaginate);

const postModel = mongoose.model(coleccionPost, postSchema);
export default postModel;