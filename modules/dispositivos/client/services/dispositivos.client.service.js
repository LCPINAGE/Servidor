(function () {
  'use strict';

  angular
    .module('dispositivos.services')
    .factory('DispositivosService', DispositivosService);

  DispositivosService.$inject = ['$resource'];

  function DispositivosService($resource) {
    return $resource('api/dispositivos/:dispositivoId', {
      dispositivoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function CentralsService($resource) {
    return $resource('api/centrals', {
    }
}());
