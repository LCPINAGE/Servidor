'use strict';

angular.module('users').controller('ChangeCentralController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    $scope.id_central;
    $scope.central = $http.get('/api/centrals');
    var user = new Users($scope.user);

    $scope.central.then(function(ret) {
      $scope.central = ret.data;
    });

    $scope.nome_central = $http.get('/api/users/me');
     $scope.nome_central.then(function(ret) {
      $scope.nome_central = ret.data.centralNome;
    });

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
       var nome_central = $http.get('/api/centrals/'+$scope.id_central);
      
        nome_central.then(function(ret) {
        user.central = $scope.id_central;
        user.centralNome = ret.data.nome;
        $scope.nome_central = user.centralNome;
        $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

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
