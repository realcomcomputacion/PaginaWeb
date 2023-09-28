var express = require('express');
var router = express.Router();
var novedadesmodels = require('../../models/novedadesmodels');


router.get('/', async function (req, res, next) {

  //var novedades = await novedadesmodels.getNovedades();

  var novedades
  if (req.query.q === undefined) {
    novedades = await novedadesmodels.getNovedades();
  } else {
    novedades = await novedadesmodels.buscarNovedades(req.query.q);
  }

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades,
    is_search: req.query.q !== undefined,
    q: req.query.q

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

/*diseño del formulario de modificar con novedad cargada*/

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  console.log(req.params.id);

  var novedad = await novedadesmodels.getNovedadById(id);

  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  })
})

/*actualizacion de modificar*/
router.post('/modificar', async (req, res, next) => {
  try {
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }


    await novedadesmodels.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');

  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    })
  }
})


module.exports = router;