/* global angular */
(function () {
  'use strict'

  angular
    .module('app')
    .constant('API_URL', "http://localhost:1337")
    .config(config)

  //

  function config () {
  }
})()
