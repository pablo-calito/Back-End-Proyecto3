const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
    
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    //Nextsirve para seguir ejecutando el middleware
    next();

}


module.exports = {
    validateFields
}