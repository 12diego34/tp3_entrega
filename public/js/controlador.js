angular.module('myApp', ["ngRoute"])
.controller('MostrarLibrosController', MostrarLibrosController)
.controller('ShowBookController', ShowBookController)
.controller('SearchBookController', SearchBookController)
.controller('RankingController',RankingController)

function MostrarLibrosController($scope, $http, $routeParams) {
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

function RankingController($scope, $http) {
    $scope.rate = function (type, id) {
        if(type === 'positive'){
            $scope.pos += 1;
            $http.post('/up/' + id).success(function(data) {
               $scope.libros = data;
                console.log(data);
            }, function(){
                console.log('error');
            });
        }else{
            $scope.neg -= 1;
            $http.post('/down/' + id).success(function(data) {
               $scope.libros = data;
                console.log(data);
            }, function(){
                console.log('error');
            });       
        }
    }
} 

function ShowBookController($scope, $http, $routeParams) {
    $scope.showBook = function(){
        var id = this.resultado.id;
        console.log(id);
        $http.get('show/'+id)
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
        $http.get('search/'+$scope.form.search_term)
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