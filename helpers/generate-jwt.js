const jwt = require('jsonwebtoken');

// jwt trabaja con callbacks y en base a promesas
const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: '1h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Sorry, there is an error generating the token.');
            } else {
                resolve(token);
            }

        });

    });

}

module.exports = {
    generateJWT
}