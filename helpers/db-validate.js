const User = require('../models/user');

const emailExists = async (email = '') => {
    const emailDbExists = await User.findOne({email});
    if (emailDbExists) {
        throw new Error(`The email: ${email} already exists in the DB`);
    }
}

const userIdExists = async (userId = '') => {
    const userIdDbExists = await User.findById({userId});
    if (!userIdDbExists) {
        throw new Error(`User id ${userId} does not exist in the database.`);
    }
}

module.exports = {
    emailExists,
    userIdExists
}