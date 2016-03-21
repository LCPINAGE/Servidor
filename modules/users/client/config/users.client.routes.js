(function () {
  'use strict';

  // Setting up route
  angular
  .module('users.routes')
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
    .state('Configurações', {
      abstract: true,
      url: '/Configurações',
      templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      data: {
        roles: ['user', 'admin']
      }
    })
    .state('settings.profile', {
      url: '/perfil',
      templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html',
      controller: 'Edição de perfil',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Configurações'
      }
    })
    .state('settings.password', {
      url: '/senha',
      templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
      controller: 'Escolha sua Senha',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Configuraçoes de senha'
      }
    })
    .state('settings.accounts', {
      url: '/conta',
      templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html',
      controller: 'SocialAccountsController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Configuraçoes de conta'
      }
    })
    .state('settings.picture', {
      url: '/imagem',
      templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html',
      controller: 'ChangeProfilePictureController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Configurações de imagem'
      }
    })
    .state('authentication', {
      abstract: true,
      url: '/autenticacao',
      templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html',
      controller: 'AuthenticationController',
      controllerAs: 'vm'
    })
    .state('authentication.signup', {
      url: '/cadastro',
      templateUrl: 'modules/users/client/views/authentication/signup.client.view.html',
      controller: 'AuthenticationController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Cadastro'
      }
    })
    .state('authentication.signin', {
      url: '/login?erro',
      templateUrl: 'modules/users/client/views/authentication/signin.client.view.html',
      controller: 'AuthenticationController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Login'
      }
    })
    .state('password', {
      abstract: true,
      url: '/senha',
      template: '<ui-view/>'
    })
    .state('password.forgot', {
      url: '/esqueceu',
      templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html',
      controller: 'PasswordController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Esqueceu sua senha'
      }
    })
    .state('password.reset', {
      abstract: true,
      url: '/resetar',
      template: '<ui-view/>'
    })
    .state('password.reset.invalid', {
      url: '/invalido',
      templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html',
      data: {
        pageTitle: 'Erro ao resetar senha'
      }
    })
    .state('password.reset.success', {
      url: '/successo',
      templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html',
      data: {
        pageTitle: 'Sucesso ao resetar senha'
      }
    })
    .state('password.reset.form', {
      url: '/:token',
      templateUrl: 'modules/users/client/views/password/reset-password.client.view.html',
      controller: 'PasswordController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Modo de resetar senha'
      }
    });
  }
}());
