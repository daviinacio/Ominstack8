const Dev = require('../models/Devs');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targerDev = await Dev.findById(devId);

        if(!targerDev){
            console.log(`ID de usuário ${user} não encontrado`);
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if(loggedDev.likes.includes(targerDev._id)){
            console.log(`${targerDev.user} já faz parte da lista de dislikes de ${loggedDev.user}`);
            return res.status(400).json({ error: 'Dislike já existente' });
        }

        console.log(`${loggedDev.user} deu dislike em ${targerDev.user}`);
        
        loggedDev.dislikes.push(targerDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};