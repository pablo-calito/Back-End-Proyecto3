
const { response, request } = require('express');
const Ticket = require('../models/tickets');
const User = require('../models/user');
const Movie = require('../models/movie');
const Reservation = require('../models/reservationSeat');




const getTicket = async (req = request, res = response) => {

    //condiciones del get
    const listTicket = await Ticket.find();

    res.json({
        msg: 'get Api - Ticket Controller',
        listTicket
    });
}

const postTicket = async (req = request, res = response) => {
    try {
        const { userId, movieId, reservationSeatId } = req.body;

        
        // Verificar si los campos obligatorios están presentes en la solicitud
        if (!userId || !movieId || !reservationSeatId) {
            return res.status(400).json({ msg: 'UserId, movieId and  reservationId required fields' });
        }
        

        // Buscar información del usuario, película y reserva

        const user = await User.findById(userId);
        const movie = await Movie.findById(movieId);
        const reservationSeat = await Reservation.findById(reservationSeatId);
    

        if (!user || !movie || !reservationSeat) {
            return res.status(404).json({ msg: 'User, movie, or reservation not found' });
        }

        // Calcular el precio total multiplicando la cantidad de asientos por el precio unitario (45)
        // const price = selectedSeats.length * 45;
        const price = reservationSeat.seats.length * 45;


        // Crear una nueva instancia de Ticket con la información proporcionada
        const newTicket = new Ticket({
            user: user,
            movie: movie,
            reservation: reservationSeat,
            price: price,
        });

        // Guardar el ticket en la base de datos
        await newTicket.save();

        res.status(201).json({
            msg: 'Ticket created successfully',
            newTicket
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const deleteTicket = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    //Eliminar cambiando el stado a false
    const userTicket = await Ticket.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE eliminar Ticket',
        userTicket
    });
}

module.exports = {
    getTicket,
    deleteTicket,
    postTicket
}