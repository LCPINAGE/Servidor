(function () {
  'use strict';

  angular
    .module('centrals')
    .controller('CentralsController', CentralsController);

  CentralsController.$inject = ['$scope', '$state', 'centralResolve', 'Authentication'];

  function CentralsController($scope, $state, central, Authentication) {
    var vm = this;

    vm.central = central;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // Remove existing Article
    function remove() {
      if (confirm('Tem certeza que deseja excluir?')) {
        vm.central.$remove($state.go('centrals.list'));
      }
    }

    // Save Article
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

      function successCallback(res) {
        $state.go('centrals.view', {
          centralId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
