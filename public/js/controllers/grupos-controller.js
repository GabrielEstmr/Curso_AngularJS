angular.module('alurapic').controller('GruposController', function ($scope, $http) {
    $scope.grupos = [];



    $http.get('v1/grupos')
        .success(function (data) {
            $scope.grupos = data;
        })
        .error(function (err) {
            console.log(err);
        });


});