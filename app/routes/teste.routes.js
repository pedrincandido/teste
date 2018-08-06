module.exports = (app) => {
    const pessoa = require('../controllers/teste.controller.js');

    // Create a new Note
    app.post('/pessoa', pessoa.create);

    // Retrieve all Notes
    // app.get('/pessoa', pessoa.findAll);

    // Retrieve a single Note with noteId
    // app.get('/pessoa/:pessoaId', pessoa.findOne);

    // Update a Note with noteId
    app.put('/pessoa/:pessoaId', pessoa.update);

    app.get('/pessoa/', pessoa.find);

    // Delete a Note with noteId
    app.delete('/pessoa/:pessoaId', pessoa.delete);
}