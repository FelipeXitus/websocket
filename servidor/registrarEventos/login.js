import { encontrarUsuario, validarSenha } from "../db/usuariosDb.js";
import { generateSession } from "../utils/session.js";

function registrarEventosLogin(socket, io) {
    socket.on('autentication-user', async (dados) => {
        // Lógica de autenticação do usuário
        const { nome, senha } = dados;

        // Exemplo de verificação de usuário (substitua pela lógica real)
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
        const session = generateSession(usuario.nome, usuario.senha.hash);
        console.log('Session gerada:', session);
    });
}

export default registrarEventosLogin;