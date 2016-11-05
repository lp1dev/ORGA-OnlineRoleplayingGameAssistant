(function () {
  'use strict';

    app.controllers
    .controller('createGameController', createGameController)

  createGameController.$inject = ['$location', '$http', 'API_URL']

  ////

  /* @ngInject */
  function createGameController ($location, $http, API_URL) {
    var vm = this;

    vm.name = "createGameController";
    vm.putGame = putGame;

    function putGame(){
      $http.put(API_URL + "/game/" + vm.gameName + "/" + vm.gamePassword)
        .then(function(request){
          $location.path("/game/").search({"name": vm.gameName, "password": vm.gamePassword})
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
