const Pessoa = require('../models/teste.model.js');
var mongoose = require('mongoose');

const querystring = require('querystring'); 

exports.create = (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }
    // console.log(req.body);
    const pessoa = new Pessoa({
        _id: new mongoose.mongo.ObjectId(),
        nome: req.body.nome.toLowerCase(),
        email: req.body.email.toLowerCase(),
        usuario: req.body.usuario.toLowerCase(),
        estado: req.body.estado,
        cidade: req.body.cidade,
        telefone: req.body.telefone,
        status: req.body.status
    });

    // Save Note in the database
    pessoa.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.findAll = (req, res) => {
    Pessoa.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


// exports.find = (req, res) => {
//     Pessoa.find({status: ''})
//     .then(notes => {
//         res.send(notes);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving notes."
//         });
//     });
// };


exports.find  = (req, res) => {
    var query = {};

    query["$or"]=[];
    if(req.query.name)
        query["$or"].push({"name":req.query.name});
    if(req.query.status)
        query["$or"].push({"status": req.query.status});
    if(req.query.usuario)
        query["$or"].push({"usuario": req.query.usuario});
    if(req.query.email)
     query["$or"].push({"email": req.query.email});
    
    
    console.log(query);
    Pessoa.find(query)
    .then(pessoa => {
        if(!pessoa) {
            return res.status(404).send({
                message: "Pessoa não encontrada" + req.body.name
            });
        }
        res.send(pessoa);
    }).catch(err => {

    });
}

exports.findOne = (req, res) => {
    Pessoa.findById(req.params.pessoaId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pessoaId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pessoaId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.pessoaId
        });
    });
};


async function pessoaGetById (pessoaID){
  return Pessoa.findById(pessoaID).exec();
};


exports.update = async (req, res) => {

    const pessoa = await pessoaGetById(req.params.pessoaId);
    Pessoa.findByIdAndUpdate(req.params.pessoaId, {
        nome: req.body.nome ? req.body.nome.toLowerCase() : pessoa.nome,
        email: req.body.email ? req.body.email.toLowerCase() : pessoa.email,
        usuario: req.body.usuario ? req.body.usuario.toLowerCase() : pessoa.usuario,
        estado: req.body.estado ? req.body.estado : pessoa.estado,
        cidade: req.body.cidade ? req.body.cidade : pessoa.cidade,
        telefone: req.body.telefone ? req.body.telefone : pessoa.telefone,
        status: req.body.status ? req.body.status : pessoa.body.status
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Pessoa não encontrada com id " + req.params.pessoaId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pessoa não encontrada com id " + req.params.pessoaId
            });                
        }
        return res.status(500).send({
            message: "Error ao atualizar pessoa com id " + req.params.pessoaId
        });
    });
};

exports.delete = (req, res) => {
    Pessoa.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};