var express = require('express');
var router = express.Router();

var Libro = require('../models/libro');
var books = require('google-books-search');

/* index. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Libreria del Viento' });
});

/* buscar. */
router.get('/buscar', function(req, res, next) {
    res.render('search', { title: 'Buscar' });
});

router.get('/catalogo', function(req, res, next) {
    res.render('catalogo', { title: 'Catalogo' });
});

/* todos los libros. */
router.get('/l/all', function(req, res, next) {
    var query = {};
    Libro.find(query, function(err, libros) {
        res.json(libros)
    });
});

/* un libro especifico. */
router.get('/l/:isbn', function(req, res, next) {
    Libro.findOne({isbn: req.params.isbn}, function(error, libro) {
        res.json({resultados: libro});
    });
});


router.get('/l/:titulo', function(req, res, next) {
    var titulo = req.params.titulo;
    Libro.findOne(titulo, function(error, libro) {
        console.log(titulo);
        res.json({resultados: libro});
    });
});

router.post('/l/new', function(req, res, next) {
    var libro = new Libro(req.body);
    libro.save().then(function (libro) {
        res.json(libro);
    });
});

/*Elimina un libro especifico*/
router.delete('/l/delete/:id', function(req, res, next) {
    Libro.remove({
        _id: req.params.id
    }, function(err, id) {
        if(err){
            res.send(err);
        }
        Libro.find(function(err, libros) {
            if(err){
                res.send(err);
            }
            res.json(libros);
        });
    })
});

router.get('/show/:id', function(req, res, next){
    var book_id = req.params.id;
    if(book_id){
        books.lookup(book_id, function(error, result) {
            res.json({ book: result });
        });
    }else
        res.json({ book: "error: no se encuentra el libro solicitado"});
});

//GOOGLE SEARCH
router.get('/search/:title', function(req, res, next) {
    var termino = req.params.title;
    var options = {'limit': 5, field: 'title', type: 'books', order: 'relevance'};
    books.search(termino, options, function(error, results) {
        if ( ! error ){
            results.forEach(function(l) {
               
                (new Libro({id:l.id, isbn:l.industryIdentifiers[0].identifier , titulo: l.title ,precio: 100, ranking_up: 0, ranking_down:0, gbook: l })).save();
            });
        };
            res.json({resultados: results});
    });
});

router.get('/search/db/:title', function(req, res, next) {
    var title = req.params.title;
    console.log({title: req.params.title});
    /*Libro.findOne({title: req.params.titulo}, function(error, libro) {
        res.json({resultados: libro});
    });*/

    Libro.findOne(title, function(error, libro) {
        res.json({resultados: libro});
    });
    /*Libro.findOne({title: req.params.titulo}, function(error, libro) {
        res.json({resultados: libro});
    });*/

});

router.post('/up/:id', function(req, res, next) {
    var id = req.params.id;
    vote(id, res, {ranking_up: 1});
});

router.post('/down/:id', function(req, res, next) {
    var id = req.params.id;
    vote(id, res, {ranking_down: -1});
});

function vote(id, res, vote_field) {
    Libro.findOneAndUpdate({'id': id}, {$inc: vote_field}, {new: true, upsert:true}, function(err, local_result){
        books.lookup(id, function(error, result) {
            if (error){
                res.send(err);
            }else
            {
            local_result.save(); 
            res.json({book: local_result}); 
            }
        });
    });
};

module.exports = router; 