import { encontrarUsuario, validarSenha } from "../db/usuariosDb.js";
import { generateSession } from "../utils/session.js";

function registrarEventosLogin(socket, io) {
    socket.on('autentication-user', async (dados) => {
        const { nome, senha } = dados;

        const usuario = await encontrarUsuario(nome);
        if (!usuario) {
            socket.emit('autentication-user-error', { message: 'Usuário não encontrado.' });
            return;
        }

        if (!validarSenha(senha, usuario.senha.salt, usuario.senha.hash)) {
            socket.emit('autentication-user-error', { message: 'Senha incorreta.' });
            return;
        }

        socket.emit('autentication-user-success', { message: 'Login bem-sucedido!' });
        const session = await generateSession(usuario.nome, usuario.senha.hash);
        console.log('Session gerada:', session);
    });
}

export default registrarEventosLogin;