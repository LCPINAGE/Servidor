(function () {
  'use strict';

  angular
    .module('dispositivos.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('dispositivos', {
        abstract: true,
        url: '/dispositivos',
        template: '<ui-view/>'
      })
      .state('dispositivos.list', {
        url: '',
        templateUrl: 'modules/dispositivos/client/views/list-dispositivos.client.view.html',
        controller: 'DispositivosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Lista de Dispositivos'
        }
      })
      .state('dispositivos.create', {
        url: '/create',
        templateUrl: 'modules/dispositivos/client/views/form-dispositivo.client.view.html',
        controller: 'DispositivosController',
        controllerAs: 'vm',
        resolve: {
          dispositivoResolve: newDispositivo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Adicionar Dispositivo'
        }
      })
      .state('dispositivos.edit', {
        url: '/:dispositivoId/edit',
        templateUrl: 'modules/dispositivos/client/views/form-dispositivo.client.view.html',
        controller: 'DispositivosController',
        controllerAs: 'vm',
        resolve: {
          dispositivoResolve: getDispositivo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Editar Dispositivo {{ dispositivoResolve.nome }}'
        }
      })
      .state('dispositivos.view', {
        url: '/:dispositivoId',
        templateUrl: 'modules/dispositivos/client/views/view-dispositivo.client.view.html',
        controller: 'DispositivosController',
        controllerAs: 'vm',
        resolve: {
          dispositivoResolve: getDispositivo
        },
        data: {
          pageTitle: 'Dispositivo {{ dispositivoResolve.nome }}'
        }
      });
  }

  getDispositivo.$inject = ['$stateParams', 'DispositivosService'];

  function getDispositivo($stateParams, DispositivosService) {
    return DispositivosService.get({
      dispositivoId: $stateParams.dispositivoId
    }).$promise;
  }

  newDispositivo.$inject = ['DispositivosService'];

  function newDispositivo(DispositivosService) {
    return new DispositivosService();
  }
}());
