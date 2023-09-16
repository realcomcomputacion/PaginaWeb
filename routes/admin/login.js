var express = require('express');
var router = express.Router();
var usuariosmodel = require('./../../models/usuariosmodel');


router.get('/', function (req, res, next) { //login.hbs
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosmodel.getUserByUsernameAndPassword(usuario, password);

    if (data != undefined) {
      res.redirect('admin/novedades');
    } else {
      req.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;