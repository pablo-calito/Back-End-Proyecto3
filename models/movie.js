const { Schema, model } = require('mongoose');

const MovieSchema = Schema({

    movieName: {
        type: String,
        required: [true, 'The name of the movie is obligated']
    },

    functions: [{
        startTime: {type: Schema.Types.Date},
        endTime: {type: Schema.Types.Date}
    }]

});


module.exports = model('Movie', MovieSchema);

