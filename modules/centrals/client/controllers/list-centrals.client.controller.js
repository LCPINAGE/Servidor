(function () {
  'use strict';

  angular
  .module('centrals')
  .controller('CentralsListController', CentralsListController);

  CentralsListController.$inject = ['$scope', '$state', 'CentralsService'];

  function CentralsListController($scope, $state, CentralsService) {
    var vm = this;
    vm.centrals = CentralsService.query();
  }
}());
