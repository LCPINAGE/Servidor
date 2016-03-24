(function () {
  'use strict';

  angular
  .module('dispositivos')
  .controller('DispositivosListController', DispositivosListController);

  DispositivosListController.$inject = ['$scope', '$state', 'DispositivosService'];

  function DispositivosListController($scope, $state, DispositivosService) {
    var vm = this;
    vm.dispositivos = DispositivosService.query();
  }
}());
