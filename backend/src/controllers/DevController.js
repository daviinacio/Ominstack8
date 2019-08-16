// Importa o axios
const axios = require('axios');

// Importa o model Dev
const Dev = require('../models/Devs');

module.exports = {
    async index(req, res){
        const { user } = req.headers;

        // Obtem as instancias no banco de dados
        const loggedDev = await Dev.findById(user);

        // Método find utiliza um filtro
        // O $and -> que as comparações serão AND
        // O $ne -> que a comparação não é igual (Not Equals)
        // Encontrar Devs cujo o _id não seja igual à ${user}
        // O $nin -> Que não esteja (Not In) dentro de uma lista
        // Encontrar Devs cujo o _id não esteva dentro de ${loggedDev.likes}

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ]
        });

        return res.json(users);

    },
    
    // Como a função do axios.get é assíncrona, é nescessários adicionar o await antes da função.
    // E consequentemente, adicionar o async na função.
    // Dessa forma a função se torna assíncrona, e aguarda o restorno do axios.

    async store(req, res){
        // Corpo do request
        //console.log(req.body);

        // Obtendo a variável com desestruturação
        const { username } = req.body;

        // Verifica se já existe um cadastro com o mesmo username
        const userExists = await Dev.findOne({ user: username.toLowerCase() });

        if(userExists){
            console.log(`Usuário ${userExists.user} já cadastrado`);
            return res.json(userExists);
        }

        // API axios obtem informações da API do GitHub
        const response = await axios.get(`https://api.github.com/users/${username}`);

        // Transforma o nome da variável diretamente na desestruturação
        const { name, bio, avatar_url: avatar } = response.data;

        // Create a dev instance
        const dev = await Dev.create({
            // Avoid crash on non name
            name: (name == undefined) ? username : name,
            user: username,
            bio: bio,
            avatar: avatar
        });

        console.log(`Usuário ${username} cadastrado com sucesso`);

        return res.json(dev);
    }
};