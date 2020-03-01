const express = require('express');
const app = express();

app.use(require('./rutas_usuario'));
app.use(require('./login_rutas'));


module.exports = app;