const movieRouter = require('express').Router();
const movieGetController = require('../controllers/movie.controller.js')

movieRouter.get('/', movieGetController)

module.exports = movieRouter;