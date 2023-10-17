const Reservation = require('../models/reservationSeat');
const Hall = require('../models/hall');
const Seat = require('../models/seat');

// Reservar asientos
const reserveSeats = async (req, res) => {
    try {
        const { hallId, seats } = req.body;
        const hall = await Hall.findById(hallId);

        if (!hall) {
            return res.status(404).json({ error: 'Movie theater not found' });
        }

        for (const seatId of seats) {
            const seat = await Seat.findById(seatId);

            if (!seat) {
                return res.status(404).json({ error: `Seat not found: ${seatId}` });
            }

            seat.availability = false;
            await seat.save();
        }

        const reservation = new Reservation({ hall, seats });
        await reservation.save();

        res.status(201).json({ message: 'Seats booked successfully ' });
    } catch (error) {
        res.status(500).json({ error: 'Error reserving seats' });
    }
};

// Verificar la disponibilidad de asientos en una sala de cine
const checkSeatAvailability = async (req, res) => {
    try {
        const { hallId } = req.params;
        const hall = await Hall.findById(hallId);

        if (!hall) {
            return res.status(404).json({ error: 'Movie theater not found' });
        }

        let seatsAva = [

        ];

        for (const id of hall.seats) {

            const seats = await Seat.findById(id);
            if (seats.availability) {
                seatsAva.push(seats)
            }
        }

        res.json(seatsAva);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error checking seat availability' });
    }
};

module.exports = {
    reserveSeats,
    checkSeatAvailability
};