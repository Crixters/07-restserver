const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/config');


app.use(require('./rutas/index'));


app.use(express.static(__dirname + '/app'));



mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) throw 'No se pudo conectar con la base de datos';
    return console.log('base de datos online');
});


app.listen(process.env.PORT);