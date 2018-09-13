const jwt = require('jsonwebtoken');

//==================================
//Verificar token
//===================================

let verificaToken = (req, res, next) => {
    let token = req.get('Auth');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

//==================================
//Verificar Admin Role
//===================================

let verificaRol_Admin = (req, res, next) => {

    let role = req.usuario.role;

    if (role == 'ADMIN_ROLE') {
        next();

    } else {
        res.status(400).json({
            ok: false,
            err: {
                message: 'No eres admin prro'
            }
        })
    }
};


module.exports = {
    verificaToken,
    verificaRol_Admin
}