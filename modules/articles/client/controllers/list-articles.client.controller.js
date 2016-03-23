(function () {
  'use strict';

  angular
  .module('articles')
  .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['$scope', '$state', 'ArticlesService'];

  function ArticlesListController($scope, $state, ArticlesService) {
    var vm = this;
    vm.articles = ArticlesService.query();
  }
}());
