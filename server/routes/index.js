var express = require('express');
var router = express.Router();
const artistsController = require('../controllers').artists;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));
  app.get('/api/artist-reviews', artistsController.getArtistReviews);
  app.post('/api/reply-reviews', artistsController.replyToReview);
};