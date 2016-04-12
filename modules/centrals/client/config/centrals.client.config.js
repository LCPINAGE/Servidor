(function () {
  'use strict';

  angular
    .module('centrals')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
   /* Menus.addMenuItem('topbar', {
      title: 'Central',
      state: 'centrals',
      type: 'dropdown',
      roles: ['user']
    });


    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'centrals', {
      title: 'Listar Centrais',
      state: 'centrals.list',
      roles: ['user']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'centrals', {
      title: 'Adicionar Central',
      state: 'centrals.create',
      roles: ['user']
    });*/
  }
}());
