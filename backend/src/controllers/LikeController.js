const Dev = require('../models/Devs');

module.exports = {
    async store(req, res) {
        // Obtem os parametros passados na rota
        //console.log(req.params);
        // Obtem os parametros passados no header
        //console.log(req.headers);
        
        const { user } = req.headers;
        const { devId } = req.params;

        //console.log(`loggedDev: ${user}`);
        //console.log(`targerDev: ${devId}`);

        // Obtem as instancias no banco de dados
        const loggedDev = await Dev.findById(user);
        const targerDev = await Dev.findById(devId);

        // Caso o usuário alvo não exista
        if(!targerDev){
            console.log(`ID de usuário ${user} não encontrado`);
            // Restorna um erro httpcode 400: bad request 
            // E retorna um json com a mensagem do erro
            return res.status(400).json({ error: 'Dev not exists' });
        }

        // Verifica se o like já foi dado
        if(loggedDev.likes.includes(targerDev._id)){
            console.log(`${targerDev.user} já faz parte da lista de likes de ${loggedDev.user}`);
            return res.status(400).json({ error: 'Like já existente' });
        }

        // Verifica se o like é recíproco
        if(targerDev.likes.includes(loggedDev._id)){
            console.log(`${loggedDev.user} e ${targerDev.user} deram match!`);
        }
        else {
            console.log(`${loggedDev.user} deu like em ${targerDev.user}`);
        }

        // Acrescenta o usuário alvo à lista de likes do usuários logado
        loggedDev.likes.push(targerDev._id);

            // Aplica as modicicações no banco de dados
        await loggedDev.save();

        return res.json(loggedDev);
    }
};