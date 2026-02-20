import { adicionarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {

    socket.on('create-user', async (dados) => {

        const user = await encontrarUsuario(dados.nome);

        if (user) {
            socket.emit('create-user-exists', { message: 'Usuário já existe.' });
            return;
        } else {
            const result = await adicionarUsuario(dados);

            if (result.acknowledged) {
                socket.emit('create-user-success', { message: 'Usuário criado com sucesso!' });
            } else {
                socket.emit('create-user-error', { message: 'Erro ao criar usuário.' });
            }
        }
    });
}

export default registrarEventosCadastro;