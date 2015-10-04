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
app.constant('VERSION', require('../package.json').version)
app.controller('SimpleController', SimpleController)
app.controller('BookListController', BookListController)
app.controller('BookSingleController', BookSingleController)

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/book_list',
        controller: 'BookListCtrl'
    }).when('/book/:bookId', {
        templateUrl: 'views/book_single',
        controller: 'BookSingleCtrl'
    }).when('/help', {
            templateUrl: 'views/help',
            controller: 'HelpCtrl'
        })
    .otherwise({
        redirectTo: '/'
    })
})