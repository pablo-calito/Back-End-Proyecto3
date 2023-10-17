const Hall = require('../models/hall');
const Seat = require('../models/seat');

// Crear una nueva sala de cine con asientos generados automáticamente
const createHallWithSeats = async (req, res) => {
  try {
    const { name } = req.body;
    const hall = new Hall({ name });
    await hall.save();

    const rows = ['A', 'B', 'C', 'D', 'E'];
    const numSeatsPerRow = 10;

    const seats = [];

    for (const row of rows) {
      for (let number = 1; number <= numSeatsPerRow; number++) {
        const seat = new Seat({ row, number, isAvailable: true, hall: hall });
        await seat.save();
        seats.push(seat);
      }
    }

    hall.seats = seats;
    await hall.save();

    res.status(201).json(hall);
  } catch (error) {
    
    res.status(500).json({ error: 'Error creating movie hall' });
  }
};

module.exports = {
    createHallWithSeats
};