console.log("Hello World")

require('jquery');
var angular = require('angular');
require('angular-route');
const x = [].concat(['s']).map(i=>4)
window.LiveReloadOptions = { host: 'localhost' };
require('livereload-js');

var app = angular.module('autodo', ['ngRoute']);
var SimpleController = require('./controllers/SimpleController');
var BookListController = require('./controllers/BookListController');
var BookSingleController = require('./controllers/BookSingleController');
var GarbageFactory = require('./factories/ProduceGarbage');
var CounterService = require('./services/Counter');
app.constant('VERSION', require('../package.json').version)
app.value('shibbyName', 'SHIBBY');
app.controller('SimpleController', SimpleController)
app.controller('BookListController', BookListController)
app.controller('BookSingleController', BookSingleController)
app.factory('garbageFactory', GarbageFactory);
app.service('counterService', CounterService);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/book_list',
        controller: 'BookListController'
    }).when('/book/:bookId', {
        templateUrl: 'views/book_single',
        controller: 'BookSingleController'
    }).when('/help', {
            templateUrl: 'views/help',
            controller: 'HelpCtrl'
        })
    .otherwise({
        redirectTo: '/'
    })
})