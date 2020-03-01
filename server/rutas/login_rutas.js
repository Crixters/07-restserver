const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const Usuario = require('../../modelos/usuario');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: '(Usuario) o Contraseña incorrectos'
            });

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(400).json({
                ok: false,
                message: 'Usuario o (Contraseña) incorrectos'
            });

        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});


module.exports = app;