import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_PRIVATE_KEY);
    return token;
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(400).send('No esta autenticado');
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(400).send('No esta autenticado');
        req.user = credentials.user;
        next();
    })
}

const authorization = policies => {
    return (req, res, next) => {
        if(!policies.includes(req.user.rol)) return res.status(401).send('No posee permisos para acceder a este recurso');
        next();
    }
}

export {generateToken, authToken, authorization};