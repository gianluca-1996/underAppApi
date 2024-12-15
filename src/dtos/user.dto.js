class UserDto{
    constructor(user){
        this._id = user._id,
        this.usuario = user.usuario,
        this.email = user.email,
        this.localidad = user.localidad,
        this.seguidos = user.seguidos,
        this.seguidores = user.seguidores,
        this.foto_perfil = user.foto_perfil,
        this.foto_portada = user.foto_portada,
        this.puntaje = user.puntaje,
        this.edad = user.edad,
        this.created_dt = user.created_dt,
        this.posteos = user.posteos
    }
};

export default UserDto;