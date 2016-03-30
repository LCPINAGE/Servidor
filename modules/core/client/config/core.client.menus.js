(function () {
  'use strict';

  angular
  .module('core')
  .run(MenuConfig);

  MenuConfig.$inject = ['Menus'];

  function MenuConfig(Menus) {

    Menus.addMenu('account', {
      roles: ['user']
    });

    Menus.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    Menus.addSubMenuItem('account', 'settings', {
      title: 'Editar Conta',
      state: 'settings.profile'
    });

    Menus.addSubMenuItem('account', 'settings', {
      title: 'Selecionar Central',
      state: 'settings.changeCentral'
    });

  }

}());
