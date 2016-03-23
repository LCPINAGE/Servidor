(function () {
  'use strict';

  angular
    .module('centrals.services')
    .factory('CentralsService', CentralsService);

  CentralsService.$inject = ['$resource'];

  function CentralsService($resource) {
    return $resource('api/centrals/:centralId', {
      centralId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
