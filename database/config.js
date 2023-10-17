const mongoose = require('mongoose');

const dbConection = async() => {

    
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('data base connect');
    } catch (error) {
        console.log(error);
        throw new Error('Error when connecting the database');
    }

}

module.exports = {
    dbConection
}