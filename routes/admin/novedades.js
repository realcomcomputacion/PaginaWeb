var express = require('express');
var router = express.Router();
var usuariosmodel = require('./../../models/usuariosmodel');


router.get('/', function (req, res, next) { //login.hbs
  res.render('admin/novedades', {
    layout: 'admin/layout'
  });
});

module.exports = router;