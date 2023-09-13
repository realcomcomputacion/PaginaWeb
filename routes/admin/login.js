var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {//login.hbs
  res.render('admin/login',{
    layout: 'admin/layout'
  });
});

module.exports = router;