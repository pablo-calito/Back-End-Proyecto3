const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');

// Ruta para agregar una nueva película con funciones
router.post('/movies', movieController.addMovie);

// Ruta para eliminar una película por su ID
router.delete('/movies/:movieId', movieController.deleteMovie);

// Ruta para obtener todas las películas
router.get('/viewmovies', movieController.getAllMovies);

module.exports = router;
