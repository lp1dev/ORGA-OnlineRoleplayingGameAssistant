(function () {
  'use strict';

    app.controllers
    .controller('playerController', playerController)

  playerController.$inject = ['$routeParams', '$location', '$http', 'API_URL']

  ////

  function playerController ($routeParams, $location, $http, API_URL) {
    var vm = this;

    vm.name = "playerController";
    vm.playerName = $routeParams.player;
    vm.gameName = $routeParams.game;
    if (undefined === vm.playerName || undefined === vm.gameName) {
      $location.path("/game/")
    }
    else {
      loadData();
    }

    function loadData(){
      $http.get(API_URL + "/game/" + vm.gameName)
        .then(function(request){
          vm.game = request.data;
          angular.forEach(vm.game.players, function (player, key){
            if (key === vm.playerName) {
              vm.player = player;
            }
          })
        })
        .catch(function (error){
          if (undefined !== error.data) {
            console.log(error.data.error)
          }
          else {
            console.log("Invalid entries")
          }
          alert(error.data.error);
        })
    }


  }

})();
