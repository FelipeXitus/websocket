import jwt from "jsonwebtoken";

function authUser(socket, next) {
    const session = socket.handshake.auth.session;
    
    try{
        const decoded = jwt.verify(session, process.env.SECRET_KEY_SESSION);
        socket.emit("authorization_success", decoded);
        
        next();
    } catch (error) {
        next(error);
    }
}

export { authUser };