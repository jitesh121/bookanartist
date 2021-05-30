const Artist = require('../models').Artist;
const Reviews = require('../models').Reviews;
const Customer = require('../models').Customer;
const sequelize = require('sequelize');
const async = require('async');

exports.getArtistReviews = async (req, res) => {
  console.log("Called getArtistReviews");
  //Using an static artist ID to get review here we can get ID from token also
  Reviews.belongsTo(Artist, { foreignKey: "artist" });
  const artistId = 1;
  let data = {};
  async.waterfall([
    (cb) => {
      Artist.findOne({ id: artistId }).then((artistData) => {
        if (!artistData) {
          return cb("Artist not Found");
        }
        return cb(null, artistData);
      }).catch((err) => {
        return cb(err);
      })
    },

    (artistData, cb) => {
      Reviews.findAll({
        where: { artist: artistId },
        include: [{
          model: Customer,
          as: 'Customer' // specifies how we want to be able to access our joined rows on the returned data
        }]
      }).then((reviewData) => {
        return cb(null, artistData, reviewData);
      }).catch((err) => {
        console.log(err)
        return cb(err);
      })
    },
  ], (err, artistData, reviewData) => {
    if (err) {
      res.status(500).send({"message":"Internal Server Error"})
    }
    data.result = {
      'artist': artistData,
      'reviews': reviewData
    };
    res.status(200).send(data);
  });
};

exports.replyToReview = async (req, res) => {
  Reviews.update({
    replies: req.body.replies,
  }, {
    where: {
      id: req.body.reviewId,
    }
  }).then(reviewUpdated => {
    if (reviewUpdated) {
      res.status(200).send(reviewUpdated);
    }
  }).catch((err) => {
    res.status(500).send({ "message": "Internal Server Error" });
  })
}