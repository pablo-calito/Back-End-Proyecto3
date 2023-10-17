const { Schema, model } = require('mongoose');

const TicketsSchema = Schema({

    price: {
        type: Number,
        required: [true, 'The price is obligated']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The name is obligated']
    },

    reservation: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
        required: [true, 'The reservation is obligated']
    }],

    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: [true, 'The Movie is obligated']
    },

});


module.exports = model('Ticket', TicketsSchema);