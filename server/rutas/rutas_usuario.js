const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Usuario = require('../../modelos/usuario');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const { verificaToken, verificaAdmin } = require('../middlewares/autenticacion');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/usuarios', [verificaToken, verificaAdmin], (req, res) => {


    let since = req.query.since || 0;
    since = Number(since);


    Usuario.find({ estado: true })
        .skip((since - 1) * 5)
        .limit(5)
        .exec((err, usuariosArreglo) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, cont) => {
                if (err) throw err;
                res.json({
                    ok: true,
                    usuario: usuariosArreglo,
                    NumeroUsuarios: cont
                });
            });


        });




});

app.post('/usuarios', [verificaToken, verificaAdmin], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, UsuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // UsuarioDB.password=null;

        res.json({
            ok: true,
            usuario: UsuarioDB
        });

    });

});


app.put('/usuarios/:id', [verificaToken, verificaAdmin], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'password', 'img', 'estado']);
    body.password = bcrypt.hashSync(body.password, 10);



    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });


});

app.delete('/usuarios/:id', [verificaToken, verificaAdmin], (req, res) => {

    let id = req.params.id;


    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, userChangedStatus) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userChangedStatus) {
            return res.status(400).json({
                ok: false,
                errorReason: "The user is already deleted"
            });
        }

        res.status(200).json({
            ok: true,
            UsuarioBorrado: userChangedStatus
        });

    });

    // Usuario.findByIdAndRemove(id, (err, deletedUser) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!deletedUser) {
    //         return res.status(400).json({
    //             ok: false,
    //             errorReason: "The user is already deleted"
    //         });
    //     }

    //     res.json({
    //         status: true,
    //         usuario: deletedUser
    //     });

    // });


});


module.exports = app;