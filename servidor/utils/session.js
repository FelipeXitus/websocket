import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateSession(usuario, senhaHash) {

    const secretKey = process.env.SECRET_KEY_SESSION;
    console.log('Secret Key:', secretKey); // Verifique se a chave secreta está sendo carregada corretamente
    const token = jwt.sign(
        {
            "nome": usuario.nome,
            "senha": senhaHash,
            "iat": Math.floor(Date.now() / 1000)
        },
        secretKey
    );
    return token;
}

export { generateSession };