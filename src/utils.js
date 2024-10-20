import jwt from "jsonwebtoken";

const verifyToken = (token) => {
    let user;
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, credentials) => {
        if(error) user = null;
        else user = credentials.user;
    });

    return user;
}

export default verifyToken;