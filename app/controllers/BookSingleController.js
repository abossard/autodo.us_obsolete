export default function BookSingleCtrl($scope,
                                       $routeParams,
                                       garbageFactory,
                                       counterService) {
    $scope.bookId = $routeParams.bookId;
    garbageFactory.getRandomBooks().then(function (books) {
        $scope.book = books.data.filter((b)=>(b.id == $scope.bookId))[0];
        console.log(books.data);
        console.log($scope.book);
    });
    $scope.logger = function() {
        console.log("HAR HAR");
    };
    //.then(function(book){
    //    book);
    //    $scope.book = book;
    //});

    $scope.c = counterService.getCount();
}