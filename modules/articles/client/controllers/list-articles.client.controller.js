(function () {
  'use strict';

  angular
  .module('articles')
  .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['$scope', '$state', 'ArticlesService'];

  function ArticlesListController($scope, $state, ArticlesService) {
    var vm = this;
    vm.activateNotify = activateNotify;
    vm.desactivateNotify = desactivateNotify;

    function activateNotify() {
      console.log("ativando");
    }
    function desactivateNotify() {
      console.log("desativando");
    }

    vm.articles = ArticlesService.query();
  }
}());
