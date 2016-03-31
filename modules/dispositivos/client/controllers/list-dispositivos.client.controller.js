(function () {
  'use strict';

  angular
  .module('dispositivos')
  .controller('DispositivosListController', DispositivosListController);

  DispositivosListController.$inject = ['$scope', '$http', '$state', 'DispositivosService', 'Users', 'Authentication'];

  function DispositivosListController($scope, $http, $state, DispositivosService, Users, Authentication) {
    var vm = this;
    vm.dispositivos = DispositivosService.query();
    $scope.user = Authentication.user;
    vm.procuraDispositivos = procuraDispositivos;
    console.log($scope.user);
    
    
     function procuraDispositivos() {
      $http.get('/api/dispositivos/procuraDispositivos').success(function(retorno) {
        console.log("deu get");
      });
    }

  }
}());
