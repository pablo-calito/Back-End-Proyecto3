const { Schema, model } = require('mongoose');


const HallSchema = Schema({

    seats: [{
        type: Schema.Types.ObjectId,
        ref: 'Seat',
    }],

    name: {
        type: String,
        required: [true, 'The Name Hall is obligated']
    }

});

module.exports = model('Hall', HallSchema);