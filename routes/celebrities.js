const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrities')

// Handle GET request for website root
router.get('/', (req, res, next) => {
  Celebrity.find({})
  .then(celebrities => {
    res.render('celebrities/index.hbs', {celebrities});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/show/:id', (req, res, next)=> {
  const id = req.params.id;
  Celebrity.findById(id)
  .then(celebrities => {
    res.render('celebrities/show.hbs', {celebrities: celebrities});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/create', (req, res, next)=> {
    res.render('celebrities/create.hbs');
});

router.post('/create', (req, res, next) => {
console.log(req.body);
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
    .then(celebrities => {
     res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});





module.exports = router;
