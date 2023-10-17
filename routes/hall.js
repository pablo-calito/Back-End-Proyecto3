const express = require('express');
const router = express.Router();
const {createHallWithSeats} = require('../controllers/hall');
const {reserveSeats, checkSeatAvailability} = require('../controllers/reservationSeat');
const { jwtValidate } = require('../middlewares/jwt-validate');


// Rutas para gestionar las salas de cine
router.post('/halls', createHallWithSeats);

// Rutas para gestionar los asientos
router.post('/halls/reserve', [jwtValidate], reserveSeats);

router.get('/seats/:hallId', checkSeatAvailability);


module.exports = router;