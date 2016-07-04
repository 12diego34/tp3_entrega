angular.module('myApp', ["ngRoute"])
.controller('MostrarLibrosController', MostrarLibrosController)
.controller('ShowBookController', ShowBookController)
.controller('SearchBookController', SearchBookController)
.controller('RateBookController',RateBookController)

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
}

function RateBookController($scope, $http) {
    $scope.rate = function (type, book_id) {
        var url; 
        /*if(type === 'positive'){
            $scope.pos += 1;
            url = '/vote/up/';
            //console.log('ranking_up', book_id);            
        }else{
            if (type === 'negative'){
                console.log('ranking_down', book_id);
                $scope.neg -= 1;
                url = '/vote/down/';
        }*/
        $scope.pos += 1;
        $http.post('/vote/up/' + book_id).success(function(data) {
                $scope.libros = data;
                console.log(data);
        
        //$http.post(url+ book_id)
        //.then(function(libro) {
        //    console.log('libro ', libro);
        }, function(){
            console.log('error');
        });
        }
    }
function ShowBookController($scope, $http, $routeParams) {
    $scope.showBook = function(){
        var id = this.resultado.id;
        console.log(id);
        $http.get('api/show/'+id)
            .then(function(result){
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
                $scope.form = true;
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