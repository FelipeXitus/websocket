import { alertarERedirecionar, atualizaTextoEditor, onAuthorizationSuccess, updateUsersInterface } from "./documento.js";
import { obterCookie } from "../../utils/cookies.js";

const socket = io("/usuarios",{ 
  auth: { 
    session: obterCookie("session") 
  } 
});

socket.on("authorization_success", onAuthorizationSuccess);

socket.on("connect_error", (error) => {
  alert(error.message);
  window.location.href = '/login/index.html';
});

function selecionarDocumento(entryData) {
  socket.emit("selecionar_documento", entryData, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on("usuarios_documento", updateUsersInterface);

socket.on("user_already_connected", (message) => {
  alert(message);
  window.location.href = '/';
});

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
