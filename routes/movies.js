const express = require('express');
const router = express.Router();
const Movie = require('../models/movies')



// Handle GET request for website root
router.get('/', (req, res, next) => {
  Movie.find()
  .then(movies => {
    console.log(movies);
    res.render('movies/index', {movies});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/show/:id', (req, res, next)=> {
  const id = req.params.id;
  Movie.findById(id)
  .then(movies => {
    res.render('movies/show', {movies: movies});
  })
  .catch(error => {
    next(error);
  });
});


router.get('/create', (req, res, next)=> {
  res.render('movies/create');
});

router.post('/create', (req, res, next) => {
  console.log(req.body);
    Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot
    })
      .then(movies => {
       res.redirect('/');
      })
      .catch(error => {
        next(error);
      });
  });


router.post('/:id/delete', (request, response, next) => {
  const id = request.params.id;
  Movie.findByIdAndDelete(id)
    .then(() => {
      response.redirect('/movies');
    })
    .then(error => {
      next(error);
    });
});



module.exports = router;
