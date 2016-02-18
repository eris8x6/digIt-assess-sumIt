/* Controller Module */

var sumItCtlr = angular.module( 'SumItCtlr', ['Engine'] );

sumItCtlr.controller( "MainMenuCtlr", [ "$scope", "$location", "CurrentGame",
    function( $scope, $location, game ) {
    
    $scope.newGame = function() {
        game.newGame();
        $location.path( "/equation/" );
    };
   
}]);

sumItCtlr.controller( "EquationScreenCtlr", [ "$scope", "$location", "CurrentGame", 
    function( $scope, $location, game ) {
        
    var i, aDigit, currentEquation;
    
    var loadEquation = function() {
        currentEquation = game.game.currentEq();
        $scope.operand1 = currentEquation.firstOperand;
        $scope.operand2 = currentEquation.secondOperand;
        $scope.answerDigits = new Array();
        for( i = 0; i < currentEquation.corAnsLength(); i++ ) {
            aDigit = new Object();
            aDigit.val = null;
            aDigit.onDropSuccess = function( data, event ) {
                this.val = data;
                if( $scope.isAnsComplete() ) {
                    currentEquation.playerAnswer = parsePlayerAnswer();
                    nextEquation();
                }
            };
            aDigit.display = function() {
                return this.val ? this.val : "?";
            };
            $scope.answerDigits.push( aDigit );
        }

        $scope.isAnsComplete = function() {
            var isCompl = true;
            for( i = 0; i < $scope.answerDigits.length; i++ ) {
                isCompl = isCompl && $scope.answerDigits[ i ].val;
            }
            return isCompl;
        };
    };
    
    var nextEquation = function() {
        
        game.game.next();
        
        if( game.game.complete() ) {
            $location.path("/end/");
        }
        
        loadEquation();
        
    };
    
    var parsePlayerAnswer = function() {
        var i, ans = new Array();
        for( var i = 0; i < $scope.answerDigits.length; i++ ) {
            ans.push( $scope.answerDigits[ i ].val );
        }
        return Number.parseInt( ans.join("") );
    };
    
    loadEquation();
    
    
    $scope.keypadDigits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
    
}]);

sumItCtlr.controller( "EndOfGameCtlr", ["$scope", "$location", "CurrentGame", 
    function( $scope, $location, game ) {
        $scope.equations = game.game;
}]);

