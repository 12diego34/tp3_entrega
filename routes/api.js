var express = require('express');
var router = express.Router();

var Libro = require('../models/libro');

var books = require('google-books-search');

/* GET index page. */
router.get('/', function(req, res, next) {
    var query = {};
    //if (req.query.title)
      //  query["gbook.title"] = new RegExp(req.query.title, 'i');
    Libro.find(query, function(err, libros) {
        res.json(libros)
    });
});

router.get('/:id', function(req, res, next) {
    Libro.findOne({_id: req.params.id}, function(error, libro) {
        res.json(libro);
    });
});

router.post('/', function(req, res, next) {
    var libro = new Libro(req.body);
    libro.save().then(function (libro) {
        res.json(libro);
    });
});

router.put('/', function(req, res, next) {
    res.json({ message: 'modificado' });
});

router.delete('/', function(req, res, next) {
    res.json({ message: 'Borrado' });
});

//GOOGLE SEARCH
router.get('/search/:title', function(req, res, next) {
    var termino = req.params.title;
    var options = {
        'limit': req.query.limit || 10,
        'offset': req.query.offset || 10 
    };
    books.search(termino, options, function(error, results) {
        if ( ! error )
            results.forEach(function(l) {
                (new Libro({ precio: 100, ranking: 0, gbook: l })).save();
            });
            res.json(results);
    });
});

exports.up = function (req, res, next) {
    var id = req.params.id;
    rankear(id, res, {ranking_up: 1});   
}

exports.down = function (req, res, next) {
    var id = req.params.id;
    rankear(id, res, {ranking_down: 1});   
}

function rankear(id, res, next){
    Libro.findOne({_id: req.params.id}, function(error, libro) {
        libro.save().then(function (libro) {
        res.json(libro);
    });
});

}
module.exports = router;
 