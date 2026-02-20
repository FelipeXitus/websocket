import {getConnectDb} from "./dbConnect.js";

const usuariosColecao = await getConnectDb("usuarios");

function adicionarUsuario({ nome, senha }) {
  return usuariosColecao.insertOne({ nome, senha });
}

export { adicionarUsuario };