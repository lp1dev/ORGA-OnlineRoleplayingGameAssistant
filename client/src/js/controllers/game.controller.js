(function () {
  'use strict';

  app.controllers
    .controller('gameController', gameController)

  gameController.$inject = [ '$http', '$location', '$routeParams', 'API_URL' ]

  ////

  /* @ngInject */
  function gameController ($http, $location, $routeParams, API_URL) {
    var vm = this;

    vm.name = "gameController";
    vm.gameName = $routeParams.name;
    vm.password = $routeParams.password;
    if (undefined === vm.gameName || undefined === vm.password) {
      $location.path("/create")
    }
    vm.addSlot = addSlot
    vm.addAttribute = addAttribute
    vm.deleteAttribute = deleteAttribute
    vm.addPlayer = addPlayer
    vm.editAttribute = editAttribute
    vm.getTotalPoints = getTotalPoints
    vm.saveGame = saveGame
    loadData()

    //

    function onError (request) {
      if (undefined !== request.data)
        alert(request.data.error);
    }

    function getTotalPoints (player) {
      var total = 0;
      angular.forEach(player.attributes, function (attribute) {
        if (undefined !== attribute.value && attribute.value.length > 0) {
          total += parseInt(attribute.value, 0);
        }
      });
      return total
    }

    function saveGame () {
      console.log("saving...")
      $http.post(API_URL + "/games/save")
        .then(function (request) {
          console.log("game saved")
        })
        .catch(onError)
    }

    function editAttribute (name, value, playerName) {
      console.log(name, value);
      if (value.length > 0) {
        $http.post(API_URL + '/game/' + vm.gameName + '/' + vm.password + '/player/' + playerName +
          '/attribute/' + name + '/' + value)
          .then(function (request) {
            vm.game = request.data;
          })
          .catch(onError);
      }
    }

    function addPlayer () {
      $http.put(API_URL + '/game/' + vm.gameName + '/' + vm.password + '/player/' + vm.player.name)
        .then(function (request) {
          vm.game = request.data;
        })
        .catch(onError);
    }

    function addAttribute () {
      $http.put(API_URL + "/game/" + vm.gameName + "/" + vm.password + "/attribute/" +
        vm.attribute.name + "/" + vm.attribute.min + "/" + vm.attribute.max)
        .then(function (request) {
          vm.game = request.data;
        })
        .catch(onError);
    }

    function deleteAttribute (attribute) {
      $http.delete(API_URL + "/game/" + vm.gameName + "/" + vm.password + "/attribute/" +
        attribute)
        .then(function (request) {
          loadData();
        })
        .catch(onError);
    }

    function addSlot () {
      $http.put(API_URL + "/game/" + vm.gameName + "/" + vm.password + "/slot")
        .then(function (request) {
          vm.game = request.data;
        })
        .catch(onError);
    }

    function loadData () {
      $http.get(API_URL + "/game/" + vm.gameName)
        .then(function (request) {
          vm.game = request.data;
        })
        .catch(onError);
    }
  }

})();
