class PostDto{
    constructor(post){
        this._id = post._id,
        this.texto = post.texto,
        this.reacciones = post.reacciones,
        this.comentarios = post.comentarios,
        this.created_dt = post.created_dt,
        this.created_id = post.created_id
    }
}

export default PostDto;