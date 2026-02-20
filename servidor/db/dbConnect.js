import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

let db = null;

export async function conectarAoBanco() {
  if (db) return db;

  await cliente.connect();
  db = cliente.db("alura-websockets");
  console.log("Conectado ao banco de dados com sucesso!");

  return db;
};

export async function getConnectDb(nome) {
  const database = await conectarAoBanco();
  return database.collection(nome);
};
