const { Schema, model } = require('mongoose');

const ReservationSchema = Schema({
  hall: {
    type: Schema.Types.ObjectId,
    ref: 'Hall',
    required: true,
  },
  seats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Seat',
      required: true,
    },
  ],
  reservationTime: {
    type: Date,
    default: Date.now,
  },
});

const Reservation = model('Reservation', ReservationSchema);

module.exports = Reservation;