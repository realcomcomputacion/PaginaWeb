var express = require('express');
var router = express.Router();
var novedadesmodels = require('../models/novedadesmodels');

/* GET home page. */
router.get('/', async function(req, res, next) {

var novedades = await novedadesmodels.getNovedades();

  res.render('novedades', {
    isNovedades:true,
    novedades
  });
});

module.exports = router;
