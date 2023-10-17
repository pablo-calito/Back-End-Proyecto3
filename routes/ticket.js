const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/tickets');

// Rutas para el controlador de tickets
router.get('/tickets', TicketController.getTicket);
router.post('/creatTicket', TicketController.postTicket);
router.delete('/tickets/:id', TicketController.deleteTicket);

module.exports = router;