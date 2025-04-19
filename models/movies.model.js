const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({

    movie_title: String,
    genre: String,
    release_date: Date,
    director: String,
    actors: [String],
    rating: Number,
    budget: Number,
    language: String,
    runtime_minutes: Number,
    sequel: Boolean,
    awards: [String],
    production_company: String,
    release_year: Number
});


const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie;