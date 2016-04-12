(function () {
  'use strict';

  angular
    .module('dispositivos')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Dispositivos',
      state: 'dispositivos',
      type: 'dropdown',
      roles: ['user']
    });


    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'dispositivos', {
      title: 'Listar Dispositivos',
      state: 'dispositivos.list',
      roles: ['user']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'dispositivos', {
      title: 'Adicionar Dispositivo',
      state: 'dispositivos.find',
      roles: ['user']
    });

    Menus.addSubMenuItem('topbar', 'dispositivos', {
      title: 'Adicionar Dispositivo Na Mao',
      state: 'dispositivos.create',
      roles: ['user']
    });

  }
}());
