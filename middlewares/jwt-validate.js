const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const jwtValidate = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    //Validar si el token se envia en los headers
    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        //leer al usuario que corresponda el uid
        const user = await User.findById( uid );

        //Verificar el uid del usuario, si no existiera
        if ( !user ) {
            return res.status(401).json({
                msg: 'Invalid token - User does not exist in the database'
            });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}


module.exports = {
    jwtValidate
}