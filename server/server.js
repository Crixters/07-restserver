const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/config');
app.use(require('./rutas/rutas_usuario'));


app.use(express.static(__dirname + '/app'));



mongoose.connect('mongodb+srv://Crixters:shushubana21@cluster0-qtkcn.mongodb.net/BeCell', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
    return console.log('base de datos online');
});


app.listen(process.env.PORT);