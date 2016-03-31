'use strict';

angular.module('users').controller('ChangeCentralController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    $scope.id_central;
    $scope.central = $http.get('/api/centrals');
    
    $scope.central.then(function(ret) {
      $scope.central = ret.data;
    });

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      var nome_central = $http.get('/api/centrals/'+$scope.id_central);
      
      nome_central.then(function(ret) {
        $scope.user.central = $scope.id_central;
        $scope.user.centralNome = ret.data.nome;
        console.log($scope.user.centralNome);

        $scope.success = $scope.error = null;

        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'userForm');

          return false;
        }

        var user = new Users($scope.user);

        user.$update(function (response) {
          $scope.$broadcast('show-errors-reset', 'userForm');

          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      });
    };

  }
  ]);
