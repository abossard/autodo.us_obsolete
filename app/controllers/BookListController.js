var R = require('ramda');
export default function BookListController($scope,
                                           garbageFactory,
                                           counterService,
                                           shibbyName) {
    garbageFactory.getRandomBooks().then(function(books){
        console.log(books);
        $scope.books = books.data;
    });
    $scope.c = counterService.getCount();
    $scope.xxumla = 'asd';
    $scope.shibbyName = shibbyName;
}