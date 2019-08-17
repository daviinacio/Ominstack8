const Dev = require('../models/Devs');

module.exports = {
    async store(req, res){
        //const { username} = req.body;
        const { username } = req.params;

        const loggedDev = await Dev.findOne({ user: username });

        if(loggedDev){

            loggedDev.likes = [];
            loggedDev.dislikes = [];

            // Salva as alterações
            await loggedDev.save();

            console.log(`Usuário ${loggedDev.user} limpo com sucesso!`);
            return res.json(loggedDev);
        }
        else {
            console.error(`Erro ao limpar usuário: Usuário não existente`);
            return res.json({
                error: "Usuário não existente"
            })
        }
    }
}