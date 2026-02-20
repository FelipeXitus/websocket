import {getConnectDb} from "./dbConnect.js";
import { saltHashData } from "../utils/saltHash.js";

const usuariosColecao = await getConnectDb("usuarios");

function encontrarUsuario(nome) {
  return usuariosColecao.findOne({ nome });
}

function adicionarUsuario({ nome, senha }) {
  const hashedPassword = saltHashData(senha);
  const [salt, hash] = hashedPassword.split(':');
  return usuariosColecao.insertOne({ nome, senha: { hash, salt } });
}

export { adicionarUsuario, encontrarUsuario };