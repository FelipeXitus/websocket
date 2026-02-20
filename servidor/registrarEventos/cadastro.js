import { adicionarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {

    socket.on('create-user', async (dados) => {
        const result = await adicionarUsuario(dados);
    });

}

export default registrarEventosCadastro;