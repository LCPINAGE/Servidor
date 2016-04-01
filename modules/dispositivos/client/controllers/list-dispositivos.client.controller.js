(function () {
  'use strict';

  angular
  .module('dispositivos')
  .controller('DispositivosListController', DispositivosListController);

  DispositivosListController.$inject = ['$scope', '$http', '$state', 'DispositivosService', 'Users', 'Authentication'];

  function DispositivosListController($scope, $http, $state, DispositivosService, Users, Authentication) {
    var vm = this;
    vm.dispositivos = DispositivosService.query();
    vm.user = $http.get('/api/users/me');
    
    vm.user.then(function(ret) {
      vm.user = ret.data;
      console.log(vm.user);
    });

    vm.procuraDispositivos = procuraDispositivos;
    
    
     function procuraDispositivos() {
      $http.get('/api/dispositivos/procuraDispositivos').success(function(retorno) {
        console.log("deu get");
        console.log(retorno);
      });
    }

  }
}());
