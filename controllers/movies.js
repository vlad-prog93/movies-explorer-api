const Movie = require('../models/movie');

const getMovies = async (req, res) => {
    try {
        const id = '631641fe633175534e408752';
        const movies = await Movie.find({});
        res.json({ movies: movies })
    } catch(err) {
        console.log(err)
    }
    
}

const createMovie = (req, res) => {
    try {
        const {
            country, 
            director, 
            duration, 
            year, 
            description, 
            image, 
            trailerLink, 
            thumbnail, 
            owner, 
            movieId, 
            nameRU, 
            nameEN } = req.body;
        const movie = Movie.create({
            country, 
            director, 
            duration, 
            year, 
            description, 
            image, 
            trailerLink, 
            thumbnail, 
            owner, 
            movieId, 
            nameRU, 
            nameEN });
        res.json({ movie: movie });
    } catch(err) {
        res.json({ movie: err });
    }
}

const deleteMovie = (req, res) => {
    res.json({ updateUser: 'req' })
}

module.exports = { getMovies, createMovie, deleteMovie };
