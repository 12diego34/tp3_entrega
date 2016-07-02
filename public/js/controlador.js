angular.module('myApp', ["ngRoute"])
.controller('MostrarLibrosController', MostrarLibrosController)

function MostrarLibrosController($scope, $http, $routeParams) {
    $scope.resultados = {};       
    $http.get('/l/all')
        .success(function(data) {
            $scope.libros = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}
/*
function UpController($scope) {
    function($scope) {
    $scope.ranking_up = 0;

});
    
function DownController($scope, $http, $routeParams) {
    $scope.resultados = {};       
    $http.get('/l/all')
        .success(function(data) {
            $scope.libros = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}
*/
function SearchBookController($scope, $http, $routeParams) {
    $scope.form = {};
    $scope.resultados = {};
    $scope.busqueda = false;
    $scope.sendForm = function () {
        $scope.buscando = true;
        $http.post('api/search/:title', $scope.form)
            .then(function(result) {
                $scope.busqueda = true;
                $scope.buscando = false;
                $scope.resultados = result.data.resultados;
            }, function(){
                $scope.buscando = false;
                console.log('SearchBookController: hubo un error');
            });
    };
}

/*function LibroController($scope, $http) {
    $scope.newLibro = {};
    $scope.libros = {};
    $scope.selected = false;
    $http.get('/l/all').success(function(data) {
        $scope.libros = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    // Función para registrar a un libro
    $scope.registrarLibro = function() {
        $http.post('/l/new', $scope.newLibro)
        .success(function(data) {
                $scope.newLibro = {}; // Borramos los datos del formulario
                $scope.libros = data;
            })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Función para editar los datos de un libro
    $scope.modificarLibro = function(newLibro) {
        $http.put('/l/update/' + $scope.newLibro._id, $scope.newLibro)
        .success(function(data) {
                $scope.newLibro = {}; // Borramos los datos del formulario
                $scope.libros = data;
                $scope.selected = false;
            })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Función que borra un objeto libro conocido su id
    $scope.borrarLibro = function(newLibro) {
        $http.delete('/l/delete/' + $scope.newLibro._id)
        .success(function(data) {
            $scope.newLibro = {};
            $scope.libros = data;
            $scope.selected = false;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectLibro = function(libro) {
        $scope.newLibro = libro;
        $scope.selected = true;
        console.log($scope.newLibro, $scope.selected);
    };
}
*/
