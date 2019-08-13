const { Schema, model } = require('mongoose');


const DevSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    // Array similar a um relacionamento com chave estrangeira
    // O tipo é o formato de id do banco de dados mongoDB
    // E o ref é o Schema que haverá o 'relacionamento'
    // Os colchetes informam que será armazenado uma collection
    // Caso não os tivesse, seria armazenado apenas um objeto
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]
}, {
    // Cria duas colunas de forma automatica "createAt" e "updatedAt"
    // [createAt] -> Armazena a data de criação de um registro no banco de dados
    // [updatedAt] -> Armazena a data da última alteração do resitro
    timestamps: true
});

module.exports = model('Dev', DevSchema);