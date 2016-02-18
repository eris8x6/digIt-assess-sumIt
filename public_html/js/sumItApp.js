/* Sum-It! */
/* Web coding assessment for Dig-It! Games */
/* J. Christopher Phelan, 2016 */


'use strict';
/* App Module */

var sumItApp = angular.module('SumItApp', [ 'ngRoute', 'ngDraggable', 
    'SumItCtlr', 'Engine' ]);

sumItApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/mainMenuView.html',
    }).when('/equation/', { 
        templateUrl: 'partials/equationScreenView.html', 
    }).when('/end/', {
        templateUrl: 'partials/endOfGameView.html',
    });

  $locationProvider.html5Mode(false).hashPrefix('!');
  }]);