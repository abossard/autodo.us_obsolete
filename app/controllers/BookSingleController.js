export default function BookSingleCtrl($scope,
                                       $routeParams,
                                       counterService) {
    $scope.bookId = $routeParams.bookId;
    $scope.c = counterService.getCount();
}