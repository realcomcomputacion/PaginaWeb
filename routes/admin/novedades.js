var express = require('express');
var router = express.Router();
var novedadesmodels = require('../../models/novedadesmodels');


router.get('/', async function (req, res, next) {

  var novedades = await novedadesmodels.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  await novedadesmodels.deleteNovedadesById(id);
  res.redirect('/admin/novedades');
})

/*agregar diseño de formulario*/
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', { //agregar .hbs
    layout: 'admin/layout'
  })
})

router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesmodels.insertNovedades(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    })
  }
})


module.exports = router;