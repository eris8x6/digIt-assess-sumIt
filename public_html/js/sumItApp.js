/* Sum-It! */
/* Web coding assessment for Dig-It! Games */
/* J. Christopher Phelan, 2016 */


'use strict';
/* App Module */

var sumItApp = angular.module('sumItApp', [ 'ngRoute', TODO-other-dependencies ]);

canDoApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/mainMenuView.html',
        controller: 'MainMenuCtlr'
    }).when('/equation/', { 
        templateUrl: 'partials/equationScreenView.html', 
        controller: 'EquationScreenCtlr'
    }).when('/end/', {
        templateUrl: 'partials/endOfGameView.html',
        controller: 'EndOfGameCtlr'
    });

  $locationProvider.html5Mode(false).hashPrefix('!');
  }]);