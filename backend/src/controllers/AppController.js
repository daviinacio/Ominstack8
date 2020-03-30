const App = require('../models/Apps');

module.exports = {
    async index(req, res){
        // Obtem o parametro de body, query, e param
        const app = req.param('app');

        if(app){
            const item = await App.findOne({ app: app });

            if(item){
                return res.json(item);
            }
            else {
                // Change the response status code
                res.status(404);
                return res.json({
                    code: 404,
                    message: "Application not found"
                })
            }
        }
        else {
            return res.json(await App.find());
        }
    },

    async store(req, res){
        const { name, app, staus, icon, description } = req.body;
        const { passwd } = req.headers;

        if(passwd !== "dbvj"){
            return res.json({
                code: 401,
                message: 'Unauthorized',
            });
        }

        // Verifica se já existe um cadastro com o mesmo app
        const userExists = await App.findOne({ app: app });

        if(userExists){
            console.log(`O aplicativo ${app} já está cadastrado`);
            return res.json(userExists);
        }

        // Create a dev instance
        const item = await App.create({
            name,
            app,
            staus,
            icon,
            description
        });

        console.log(`Aplication ${app} cadastrado com sucesso`);

        return res.json(item);
    }
};