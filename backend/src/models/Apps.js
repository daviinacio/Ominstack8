const { Schema, model } = require('mongoose');


const AppSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    app: {
        type: String,
        required: true
    },
    status: String,
    icon: String,
    description: String,
    installers: [{
            type: Schema.Types.ObjectId,
            ref: 'Installer'
    }]
    
    /*installers: [
        {
            platform: String,
            version: [Number, Number, Number],
            release_date: { type: Date, default: Date.now },
            link: String,
            minSdkVersion: Number,
            architecture: String
        }
    ]*/

    /*platforms: {
        android: [

        ],
        windows: [

        ],

    }*/


    // Array similar a um relacionamento com chave estrangeira
    // O tipo é o formato de id do banco de dados mongoDB
    // E o ref é o Schema que haverá o 'relacionamento'
    // Os colchetes informam que será armazenado uma collection
    // Caso não os tivesse, seria armazenado apenas um objeto
    /*likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]*/
}, {
    timestamps: true
});

module.exports = model('App', AppSchema);