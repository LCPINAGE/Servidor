  'use strict';

  angular.module('users').controller('CentralsListController', ['$http', '$scope', '$state', '$location', 'Users', 'Authentication',
  	function CentralsListController($http, $scope, $state, $location, Users, Authentication) {
  		$scope.user = Authentication.user;

  		var buscaCentrals = $http.get('/api/centrals').then(function(ret) {
  			$scope.centrals = ret.data;
  		});
  	}
  	]);
