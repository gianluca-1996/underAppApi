import mongoose from "mongoose";

const conectMongodb = () => {
    mongoose.connect(process.env.MONGO_DB_DRIVER).
    then(() => {console.log('Conectado a la base de datos')}).
    catch(error => {console.log('Error al conectar con la base de datos: ' + error.message)})
}

export default conectMongodb;