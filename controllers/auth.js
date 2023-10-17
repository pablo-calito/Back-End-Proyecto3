const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(404).json({
                msg: 'The email does not exist in the database.'
            });
        }

        const validatePassword = bcryptjs.compareSync(password, userExists.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'The password is incorrect'
            });
        }

        const token = await generateJWT(userExists.id, userExists.name);

        const salt = bcryptjs.genSaltSync();
        passwordUser = userExists.password;
        encryptedPassword = bcryptjs.hashSync(password, salt);

        res.json({
            msg: 'Login Auth works',
            name: userExists.name, encryptedPassword,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'please contact the administrator'
        })
    }
}


module.exports = {
    login
}