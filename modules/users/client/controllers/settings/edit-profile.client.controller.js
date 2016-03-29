(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$http', '$location', 'Users', 'Authentication'];

  function EditProfileController($scope, $http, $location, Users, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.updateUserProfile = updateUserProfile;
    console.log("TESTE");

    // Update a user profile
    function updateUserProfile(isValid) {
      
    }
  }
}());
