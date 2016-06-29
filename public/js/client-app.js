angular.module('bookSearchClient',['ngRoute','contollers'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/search', {
            templateUrl: 'books/search',
            controller: SearchBookController
        }).
        when('/show/:id', {
            templateUrl: 'books/search',
            controller: ShowBookController
        }).
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
}])


angular.module('LibroApp',['','contollers'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/libros/catalogo', {
            templateUrl: 'index',
            controller: LibroController
        }).
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
}])