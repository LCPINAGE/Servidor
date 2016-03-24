(function () {
  'use strict';

  angular
    .module('centrals.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('centrals', {
        abstract: true,
        url: '/centrals',
        template: '<ui-view/>'
      })
      .state('centrals.list', {
        url: '',
        templateUrl: 'modules/centrals/client/views/list-centrals.client.view.html',
        controller: 'CentralsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Centrais'
        }
      })
      .state('centrals.create', {
        url: '/create',
        templateUrl: 'modules/centrals/client/views/form-central.client.view.html',
        controller: 'CentralsController',
        controllerAs: 'vm',
        resolve: {
          centralResolve: newCentral
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Nova Central'
        }
      })
      .state('centrals.edit', {
        url: '/:centralId/edit',
        templateUrl: 'modules/centrals/client/views/form-central.client.view.html',
        controller: 'CentralsController',
        controllerAs: 'vm',
        resolve: {
          centralResolve: getCentral
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Editar Central {{ centralResolve.nome }}'
        }
      })
      .state('centrals.view', {
        url: '/:centralId',
        templateUrl: 'modules/centrals/client/views/view-central.client.view.html',
        controller: 'CentralsController',
        controllerAs: 'vm',
        resolve: {
          centralResolve: getCentral
        },
        data: {
          pageTitle: 'Central {{ centralResolve.nome }}'
        }
      });
  }

  getCentral.$inject = ['$stateParams', 'CentralsService'];

  function getCentral($stateParams, CentralsService) {
    return CentralsService.get({
      centralId: $stateParams.centralId
    }).$promise;
  }

  newCentral.$inject = ['CentralsService'];

  function newCentral(CentralsService) {
    return new CentralsService();
  }
}());
