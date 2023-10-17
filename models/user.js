const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is obligated']
    },
    lastname:{
        type: String,
        required: [true, 'The lastname is obligated']
    },
    password: {
        type: String,
        required: [true, 'the password is obligated' ]
    },
    email: {
        type: String,
        required: [true, 'The email is obligated' ],
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: [true, 'The phone number is obligated' ],
    }

});


module.exports = model('User', UserSchema);