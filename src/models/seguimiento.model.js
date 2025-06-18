import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const coleccionSeguimiento = 'Seguimiento';

const seguimientoSchema = new mongoose.Schema({
    seguidor: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    seguido: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
}, { timestamps: true });

seguimientoSchema.plugin(mongoosePaginate);
seguimientoSchema.index({seguidor: 1, seguido: 1});

const seguimientoModel = mongoose.model(coleccionSeguimiento, seguimientoSchema);
export default seguimientoModel;