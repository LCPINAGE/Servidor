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

}());

(function () {
  'use strict';

  angular
    .module('dispositivosCentral.services')
    .factory('DispositivosCentralsService', DispositivosCentralsService);

  DispositivosCentralsService.$inject = ['$http'];

  function DispositivosCentralsService($http) {
    return $http.get('api/centrals');
  }

}());
