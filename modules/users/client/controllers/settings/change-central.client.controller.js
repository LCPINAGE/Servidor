(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChangeCentralController', ChangeCentralController);

  ChangeCentralController.$inject = ['$scope', '$http', '$location', 'Users', 'Authentication'];

  function ChangeCentralController($scope, $http, $location, Users, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.updateUserProfile = updateUserProfile;
   // vm.central = $http.get('/api/centrals');
    vm.sucess = false;


    /* vm.central.then(function(ret) {
      vm.central = ret.data;
      console.log(vm.central);
    }); */

    // Update a user profile
    function updateUserProfile(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new Users(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        vm.success = true;
        Authentication.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    }
  }
}());
