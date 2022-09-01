const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require("cors");


const url ="mongodb://127.0.0.1:27017";
const dbName ="jornada-fullstack-agosto-22";


//Declaração função main()
async function main () {
//Realizar a conexão com o mongoclient
//Mongoclient - monfodatabase - mongocollection


//Conexoes com o client podem levar um tempo pra concluir.
//Portanto  utilizamos o mecanismo de promises do javascripr que permitem
//aguardar esse tempo. Para isso, utilizamos o async/await.

console.log("Conectando com o banco de dados...");

const client = await MongoClient.connect(url);
const db = client.db(dbName);
const collection = db.collection("pontuacoes");

console.log("Banco de dados conectado com sucesso!");

const app = express();

//Ativamos as ocnfigurações do CORS
app.use(cors());


//sinalizar para o express que estamos usando o JSON no body das requisições.
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});
app.get("/oi", function (req, res){
    res.send("Olá, mundo!");
});

// Nosso backend armazena as pontuações das jogadas
// Criar a lista com as pontuações


// const lista = [
//   {
//     id: 1,
//     nome: "Jonas",
//     pontos: 90,
//   },
//   {
//     id: 2,
//     nome: "Eduardo",
//     pontos: 50,
//   },
//   {
//     id: 3,
//     nome: "Jason",
//     pontos: 30,
//   }
// ];

// Endpoint READ ALL [GET] /pontuacoes
app.get("/pontuacoes", async function(req, res){
  const itens = await collection
  .find()
  .sort({ pontos: -1 })
  .limit(10)
  .toArray();

    res.send(itens);
});

//Criar um endpoit de CREATE seguinto o rest [POST] /pontuacoes
app.post("/pontuacoes", async function (req, res){

  //Pegar o item do corpo da requisição
    const item = req.body;
    //console.log(item);

    //Adicionas o item na lista
  //lista.push ({
      //id: lista.length + 1,
     // nome: item.nome,
     // pontos: item.pontos,
   // })

   await collection.insertOne(item);


    res.send(item);
});

app.listen(process.env.PORT || 3333)
}
//Executamos a função main()
main();