angular.module('myApp', ["ngRoute"])
.controller('MostrarLibrosController', MostrarLibrosController)
.controller('ShowBookController', ShowBookController)
.controller('SearchBookController', SearchBookController)

function MostrarLibrosController($scope, $http, $routeParams) {
    $scope.formData = {};       
    $http.get('/l/all')
        .success(function(data) {
            $scope.libros = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.delete = function(id) {
        $http.delete('/l/delete/' + id)
            .success(function(data) {
                $scope.libros = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    $scope.editarPrecio = function(id) {
        $http.put('/l/update/' + id)
        .success(function(precio) {
                $scope.libro.precio = precio
            })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    
    $scope.up = function($scope) {
        $scope.ranking_up = 0;
    }

    $scope.down = function($scope) {
        $scope.ranking_down = 0;
    }
}


function ShowBookController($scope, $http, $routeParams) {
    $scope.showBook = function(){
        var id = this.resultado.id;
        $http.get('/books/show/' + id)
            .then(function(result){
                console.log(JSON.stringify(result.data.book, null, 2));
                var book = result.data.book;
                var $title = $('#modal-info-libro .modal-title .titulo');
            }, function(error){
                console.log("error!", error.responseText);
            });
    }
}

function SearchBookController($scope, $http, $routeParams) {
    $scope.form = {};
    $scope.resultados = {};
    $scope.busqueda = false;
    $scope.form.search_term = $('#hidden_search_term').val();
    $scope.sendForm = function () {
        $scope.buscando = true;
        $http.get('api/search/'+$scope.form.search_term)
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
*/