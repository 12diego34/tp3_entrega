var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Libreria del Viento' });
});

router.get('/buscar', function(req, res, next) {
 	res.render('search', { title: 'Buscar' });
});

router.get('/catalogo', function(req, res, next) {
	res.render('catalogo', { title: 'Catalogo' });
});

module.exports = router;
