import mongoose from "mongoose";

const coleccionPantalla = 'Pantalla';
const pantallatSchema = new mongoose.Schema({
    nombre: {type: String, require: true},
    path: {type: String, require: true},
    descripcion: {type: String, require: false},
    roles_permitidos: { type: [String], default: [] }
});

const pantallaModel = mongoose.model(coleccionPantalla, pantallatSchema);
export default pantallaModel;