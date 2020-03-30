// Importa o express
const express = require('express');

// Importa o mongoose
const mongoose = require('mongoose');

// Importa o cors
const cors = require('cors');

// Para requisitar um arquivo o caminho deve ser passado como parametro
const routes = require('./routes');

// Servidor http
const app = express();

// Importa o modulo de http padrão.
// Extrair o servidor http de dentro do express.
// Unir com um servidor web socket
const server = require('http').Server(app);
// O require retorna uma função.
// Nessa função é passado o servidor http
const io = require('socket.io')(server);

// O recomendado seria utilizar algum banco de dados 'chave valor'
const connectedUsers = {};

// Toda vez que alguem se connectar pelo protocolo web socket
// Socket: conexão entre o backend e o fontend
io.on('connect', socket => {
    // Obtem os parametros passados na conexão
    const { user } = socket.handshake.query;

    // Associa um id de usuário à um id de conexão
    // Será util para as próximas transferências
    connectedUsers[user] = socket.id;

    console.log(user, socket.id);
    console.log(connectedUsers);


    /*console.log('Nova conexão', socket.id);

    socket.on('hello', message => {
        console.log(message);
    });

    setTimeout(() => {
        // Emite uma mensage do tipo world para o frontend
        socket.emit('world', {
            message: 'Omnistack8'
        });
    }, 5000);*/
})

// Conecta o mongoose ao banco de dados mongoDB atlas atravez da string de conexão
mongoose.connect('mongodb+srv://daviinacio:dicvdicv@cluster0-eig17.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// Quando qualquer requisição chegar, primeiro passa por esse metódo.
// Para depois chegar nas rotas.
// Quando chegar, o middleware pode fazer o que ele quiser com o req e o res.
// Quando terminar, ele chama o next, para o fluxo da aplicação continuar acontecendo.
app.use((req, res, next) => {
    // Os parametros são passados para qualquer rota que for acessada
    req.io = io;
    req.connectedUsers = connectedUsers;

    // Continuar o fluxo da aplicação
    return next();
});

// Permite que a aplicação seja acessada por qualquer endereço
app.use(cors());

// Diz para o express que as requisições estarão em json
app.use(express.json());

// Adiciona alguma configuração que está em outro arquivo ou módulo
// Adiciona as rotas para o servidor
app.use(routes);

// Configura o servidor para ouvir a porta 3333
server.listen(process.env.PORT || 3333);