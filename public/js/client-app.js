
angular.module('bookSearchClient',['ngRoute','contollers'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/search/:title', {
            templateUrl: 'api/search/:title',
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