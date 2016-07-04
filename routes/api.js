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
router.get('/l/:id', function(req, res, next) {
    Libro.findOne({id: req.params.id}, function(error, libro) {
        res.json(libro);
    });
});

router.get('/l/:title', function(req, res, next) {
    Libro.findOne({title: req.params.title}, function(error, libro) {
        res.json(libro);
    });
});

router.get('/l/:precio', function(req, res, next) {
    Libro.findOne({precio: req.params.precio}, function(error, libro){
        res.json(libro);
    });
});

router.post('/l/new', function(req, res, next) {
    var libro = new Libro(req.body);
    libro.save().then(function (libro) {
        res.json(libro);
    });
});

/*FALTA HACER ESTE*/
router.put('/l/update/:id', function(req, res, next) {
    res.json({ message: 'modificado' });
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
    var options = {'limit': 1, field: 'title', type: 'books', order: 'relevance'};
        books.search(termino, options, function(error, result) {
            res.json({ resultados: result });
        
            /*    if (error){
                res.send(err);
            }else{
                result.forEach(function(l) {
                    (new Libro({ precio: 100, ranking_up: 0,ranking_down: 0,gbook: l })).save();
                });
            res.json({ resultados: result });
            }
            /*results.forEach(function(l) {
                (new Libro({ precio: 100, ranking_up: 0,ranking_down: 0, gbook: l })).save();
            });
            res.json(results);
            */
    });
});


/*
//GOOGLE SEARCH
router.get('/search/:title', function(req, res, next) {
    var termino = req.params.title;
    var options = {'limit': 10, field: 'title', type: 'books', order: 'relevance'};
        books.search(termino, options, function(error, result) {
            if (error){
                res.send(err);
            }else
            {
                result.forEach(function(result,error) {
                    if (error){
                       res.send(err);
                    }
                   (new Libro({ precio: 1, ranking_up: 0,ranking_down:0, gbook: result })).save();
                });
            res.json({ resultados: result });
            }
        });
});

*/
router.post('/vote/up/:id', function(req, res, next) {
    var id = req.params.id;
    vote(id, res, {ranking_up: 1});
});

router.post('/vote/down/:id', function(req, res, next) {
    var id = req.params.id;
    vote(id, res, {ranking_down: -1});
});

function vote(id, res, vote_field) {
    Libro.findOneAndUpdate({'id': req.params.id}, {$inc: vote_field}, {new: true, upsert:true}, function(err, local_result){
        //local_result.save(); 
        res.json({libro: local_result}); 
        });
    };


module.exports = router; 