import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://felipexitus_db_user:zKi7ttoVeIwMc77C@cluster0.uhnv7mg.mongodb.net/"
);

let documentosColecao;

try {
  await cliente.connect();

  const db = cliente.db("alura-websockets");
  documentosColecao = db.collection("documentos");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao };
