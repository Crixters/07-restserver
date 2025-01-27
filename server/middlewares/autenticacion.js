//VERIFICAR TOKEN
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {


    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            });
        }

        req.usuario = decoded.usuario;

        next();


    });



};

//VERIFICAR ADMIN ROLE

let verificaAdmin = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role == 'USER_ROLE') {

        return res.json({
            ok: false,
            err: 'Los usuarios regulares no pueden ejecutar esta acción'
        });

    }


    next();


};

module.exports = {
    verificaToken,
    verificaAdmin
};