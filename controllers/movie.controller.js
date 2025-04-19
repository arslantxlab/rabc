const mongoose = require('mongoose')
const Movie = require('../models/movies.model.js')

const movieGetController = async (req, res, next) => {
    const { movie, sort, ratingGreaterThan, ratingLessThan, limit = 10, page = 1 } = req.query;

    let pipeline = [];

    if (movie) {
        pipeline.push({ $match: { movie_title: movie } })
    }

    if (ratingGreaterThan || ratingLessThan) {
        const ratingFilter = {}
        if (ratingGreaterThan) ratingFilter.$gte = parseInt(ratingGreaterThan);
        if (ratingLessThan) ratingFilter.$lte = parseInt(ratingLessThan);

        pipeline.push({ $match: { rating: ratingFilter } })
        console.log(ratingFilter)
    }

    if (sort) {
        pipeline.push({ $sort: { [sort]: -1 } })
    }
    console.log(pipeline)

    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });


    const movies = await Movie.aggregate(pipeline)
    const totalCount = await Movie.countDocuments();

    if (page > Math.ceil(totalCount / limit)) {
        return res.status(404).json({
            succes: false,
            message: 'Page Not Found'
        })
    }
    res.json({
        page,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        movies
    })
}


module.exports = movieGetController;