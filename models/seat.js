const { Schema, model } = require('mongoose');

const SeatSchema = Schema({
    
    row: {
        type: String,
        required: [true, 'The Row is obligated']
    },

    number: {
        type: Number,
        required: [true, 'The Number Seat is obligated']
    },

    availability: {
        type: Boolean,
        default: true
    }
      
});

module.exports = model('Seat', SeatSchema);