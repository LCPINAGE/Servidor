'use strict';

angular.module('centrals').controller('CreateCentralController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    var vm = this;

    vm.central = central;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

       function save(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.centralForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.central._id) {
        vm.central.$update(successCallback, errorCallback);
      } else {
        vm.central.$save(successCallback, errorCallback);
      }
    };

  }
]);
