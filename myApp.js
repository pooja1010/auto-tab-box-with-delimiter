angular.module('myApp', ['delimiterApp']).controller('MyCtrl', ['$scope', function ($scope) {
    $scope.Deliminater = '.';
    $scope.Box_Before_Deliminater = '4';
    $scope.Box_After_Deliminater = '3';
    $scope.IsRequired = true;
    $scope.IsDisabled = false;
    $scope.submitAnswer = function () {
        alert('submit answer')
    }

}])