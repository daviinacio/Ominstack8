// Importa o express
const express = require('express');

// Importa o mongoose
const mongoose = require('mongoose');

// Importa o cors
const cors = require('cors');

// Para requisitar um arquivo o caminho deve ser passado como parametro
const routes = require('./routes');

// Cria o servidor express
const server = express();

// Conecta o mongoose ao banco de dados mongoDB atlas atravez da string de conexão
mongoose.connect('mongodb+srv://daviinacio:dicvdicv@cluster0-eig17.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// Permite que a aplicação seja acessada por qualquer endereço
server.use(cors());

// Diz para o express que as requisições estarão em json
server.use(express.json());

// Adiciona alguma configuração que está em outro arquivo ou módulo
// Adiciona as rotas para o servidor
server.use(routes);

// Configura o servidor para ouvir a porta 3333
server.listen(3333);