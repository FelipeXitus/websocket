import { generateJwt } from './jwt.js';

async function generateSession(usuario, senhaHash) {

    const secretKey = process.env.SECRET_KEY_SESSION;
    const sessionToken = await generateJwt({
        "nome": usuario,
        "senha": senhaHash,
        "iat": Math.floor(Date.now() / 1000)
    }, secretKey);
    return sessionToken;
}

export { generateSession };