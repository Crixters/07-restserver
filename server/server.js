const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./config/config');


app.use(require('./rutas/index'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) throw 'No se pudo conectar con la base de datos';
    return console.log('base de datos online');
});


app.listen(process.env.PORT, () => {
    console.log("Corriendo en el puerto" + process.env.PORT);
});