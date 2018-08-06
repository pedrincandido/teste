const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {useNewUrlParser: true})
.then(() => {
    console.log("Sucesso");    
}).catch(err => {
    console.log('Não foi possível, saindo agora...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Bem vindo ao teste"});
});

require('./app/routes/teste.routes.js')(app);
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});