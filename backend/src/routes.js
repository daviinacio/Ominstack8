// Importa o express
const express = require('express');

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const ClearController = require('./controllers/ClearController');

// Cria uma instancia do Router
const routes = express.Router();


// Ação para o método GET
routes.get('/', (req, res) => {
    // Os parametros da requisição ficam em req.query
    let param = req.query.name;

    // Concatenação de string com variáveis
    // Retorno de requisição
    //return res.send(`Hello ${param}`);

    console.log(`Olá ${param}`);

    // Retorna um json
    return res.send({
        message: `Olá ${param}`
    })
});

// Ação para o método GET
routes.get('/devs', DevController.index);

// Ação para o médoto POST
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);
routes.post('/devs/:username/clear', ClearController.store);

/*routes.post('/devs', (req, res) => {
    // Corpo do request
    console.log(req.body);


    return res.send({
        ok: true
    });
});*/

// Para expor uma informação no node.js
module.exports = routes;