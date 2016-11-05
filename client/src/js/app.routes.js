/* global angular */
(function () {
  'use strict'

  angular
    .module('app')
    .config(routesBlock)

  //

  routesBlock.$inject = [ '$routeProvider' ]

  /* @ngInject */
  function routesBlock ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'appController',
        controllerAs: 'vm'
      })
      .when('/create', {
        templateUrl: 'partials/createGame.html',
        controller: 'createGameController',
        controllerAs: 'vm'
      })
      .when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'gameController',
        controllerAs: 'vm'
      })
      .when('/player',
        {
          templateUrl: 'partials/player.html',
          controller: 'playerController',
          controllerAs: 'vm'
        }
      )
  }
})()
