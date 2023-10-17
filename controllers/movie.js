const { response, request } = require('express');
const Movie = require('../models/movie');

// Controlador para agregar una nueva película con funciones

const addMovie = async (req, res) => {
  try {
    const { movieName, functions } = req.body;
    const movie = new Movie({ movieName, functions });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controlador para eliminar una película por su ID
const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllMovies = async (req = request, res = response) => {

  //condiciones del get
  const listMovies = await Movie.find();

  res.json({
      msg: 'get Api - Movie Controller',
      listMovies
  });
}

module.exports = {
  addMovie,
  deleteMovie,
  getAllMovies,

};
