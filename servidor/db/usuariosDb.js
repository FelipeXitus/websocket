import { getConnectDb } from "./dbConnect.js";
import { saltHashData, verifyHash } from "../utils/saltHash.js";

const usuariosColecao = await getConnectDb("usuarios");

function encontrarUsuario(nome) {
  return usuariosColecao.findOne({ nome });
}

function validarSenha(senha, salt, hash) {
  return verifyHash(senha, salt, hash);
}

function adicionarUsuario({ nome, senha }) {
  const hashedPassword = saltHashData(senha);
  const [salt, hash] = hashedPassword.split(':');
  return usuariosColecao.insertOne({ nome, senha: { hash, salt } });
}

export { adicionarUsuario, encontrarUsuario, validarSenha };