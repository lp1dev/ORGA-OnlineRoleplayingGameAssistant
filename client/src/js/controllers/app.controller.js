(function () {
  'use strict';

    app.controllers
    .controller('appController', appController)

  appController.$inject = ['$location'];

  ////

  /* @ngInject */
  function appController ($location) {
    var vm = this;

    vm.name = "placeholder";
    vm.onChange = onChange;
    vm.createGame = createGame;
    vm.loadGame = loadGame;

    function onChange (value) {
      vm.name = value;
      alert(value);
    }

    function loadGame(){
      $location.path("/game").search({name:vm.gameName, password:vm.password})
    }

    function createGame(){
      $location.path("/create")
    }
  }

})();
