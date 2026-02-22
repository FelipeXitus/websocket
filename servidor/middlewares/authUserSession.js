import jwt from "jsonwebtoken";

function authUser(socket, next) {
    const session = socket.handshake.auth.session;
    
    try{
        jwt.verify(session, process.env.SECRET_KEY_SESSION);
        next();
    } catch (error) {
        next(error);
    }
}

export { authUser };