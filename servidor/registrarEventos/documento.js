import { atualizaDocumento, encontrarDocumento, excluirDocumento } from "../db/documentosDb.js";
import { addConnection, getUserDocument, removeConnection, findConnection } from "../utils/fileConnection.js";

function registrarEventosDocumento(socket, io) {
    socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {
        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            const foundConnection = findConnection({ nomeDocumento, nomeUsuario });
            if (!foundConnection) {
                socket.join(nomeDocumento);
                addConnection({ nomeDocumento, nomeUsuario });
                socket.data = { userJoined: true };
                const userInDocument = getUserDocument(nomeDocumento)
                io.to(nomeDocumento).emit("usuarios_documento", userInDocument);
                devolverTexto(documento.texto);
            } else {
                socket.emit("user_already_connected", "Usuário já conectado a este documento.");
            }
        }
        socket.on("disconnect", () => {
            if (socket.data.userJoined) {
                removeConnection({ nomeDocumento, nomeUsuario });
                const userInDocument = getUserDocument(nomeDocumento)
                io.to(nomeDocumento).emit("usuarios_documento", userInDocument);
            }
        });
            
    });
    
    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });

    socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);

        if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
        }
  });
}

export default registrarEventosDocumento;