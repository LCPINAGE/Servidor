(function () {
  'use strict';

  angular
  .module('dispositivos')
  .controller('DispositivosController', DispositivosController);

  DispositivosController.$inject = ['$scope', '$state', '$http', 'dispositivoResolve', 'Authentication', 'Socket'];

  function DispositivosController($scope, $state, $http, dispositivo, Authentication, Socket) {
    var vm = this;

    vm.dispositivo = dispositivo;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.turnOnOff = turnOnOff;


    vm.messages = [];
    vm.messageText = '';

    function init() {

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      // Add an event listener to the 'chatMessage' event
      Socket.on('mqttMessage', function (message) {
        vm.messages.unshift(message);
        console.log(message);
      });
    }


    function turnOnOff() {
      var id = vm.dispositivo._id;
      $http.get('/api/dispositivos/' + id + '/turnOnOff').success(function(retorno) {
        console.log(retorno.success);
        dispositivo.estado = retorno.success;
        if(retorno.success === true){
          alert("Notificação Ativada em " + dispositivo.nome);
        } else {
          alert("Notivicação Desativada em " + dispositivo.nome);
        }
      });
    }

    function changeColor(estado) {
      if (estado) {
        return '#00ff00';
      } else {
        return '#ff0000';
      }
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
