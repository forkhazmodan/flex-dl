const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
    title: 'Express',
    id: uuidv4(),
  });
});

module.exports = router;
