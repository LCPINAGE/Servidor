(function () {
  'use strict';

  angular
  .module('dispositivos')
  .controller('DispositivosController', DispositivosController);

  DispositivosController.$inject = ['$scope', '$state', '$http', 'dispositivoResolve', 'Authentication'];

  function DispositivosController($scope, $state, $http, dispositivo, Authentication) {
    var vm = this;

    vm.dispositivo = dispositivo;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.turnOnOff = turnOnOff;
    vm.central = $http.get('/api/centrals');


    vm.central.then(function(ret) {
      vm.central = ret.data;
      console.log(vm.central);
    });

    console.log(vm.central);

    function turnOnOff() {
      var id = vm.dispositivo._id;
      $http.get('/api/dispositivos/' + id + '/turnOnOff').success(function(retorno) {
        location.reload();
      });
    }
    // Remove existing Dispositivo
    function remove() {
      if (confirm('Tem certeza que deseja excluir?')) {
        vm.dispositivo.$remove($state.go('dispositivos.list'));
      }
    }

    // Save Dispositivo
    function save(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dispositivoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.dispositivo._id) {
        vm.dispositivo.$update(successCallback, errorCallback);
      } else {
        vm.dispositivo.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('dispositivos.view', {
          dispositivoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
