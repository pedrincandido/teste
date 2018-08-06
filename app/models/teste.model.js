const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const pessoaSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    nome: {
        type: String,
        max: 50,
        required: [true]
    },
    email: {
        type: String,
        max: 50,
        required: [true]
    },
    usuario: {
        type: String,
        max: 12,
        required: [true]
    },
    estado: {
        type: String,
        max: 20
    },
    cidade: String,
    telefone: {
        type: String,
        max: 16
    },
    status: {
        type: String,
        enum: ['Lixeira', 'Atendido', 'Aguardando']
    }
}, { timestamps: true});

module.exports = mongoose.model('Pessoa', pessoaSchema);