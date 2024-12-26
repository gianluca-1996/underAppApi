import pantallaDao from '../daos/pantalla.dao.js';

class PantallaService{
    async getPantallasPermitidas(rol){
        return {status: 200, payload: await pantallaDao.getPantallasPermitidas(rol)}
    }
}

export default new PantallaService();