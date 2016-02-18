/* Controller Module */
var sumItCtlr = angular.module('SumItCtlr', [ 'Engine' ]);

sumItCtlr.controller( "GameController", [ "$scope", "$location", "$timeout", 
    "Equation", "GameConstants", 
    function( $scope, $location, $timeout, Equation, GameConstants ) {
    
    // Game engine logic functions
    
    var i, aDigit;
    
    var createGame = function() {
        $scope.gameLength = GameConstants.EquationCount;
        $scope.equations = new Array();
        for( i = 0; i < $scope.gameLength; i++ ) { 
            $scope.equations.push( new Equation( 
                    i % 2 === 0 ? "horiz" : "vert" ) );
        };
        $scope.equationIndex = 0;
        $scope.answerDigits.clearValues();

    };
    
    
    // Handlers
    
    $scope.newGame = function() {
        createGame();
        $location.path( "/equation/" );
    };
    
    $scope.mainMenu = function() {
        $location.path( "/" );
    };
    
    $scope.endGame = function() {
        $location.path( "/end/" );
    };
        
    // Operand display
    // TODO - refactor display stringification into view
    
    // Answer entry
    
    var parsePlayerAnswer = function() {
        var i, ans = new Array();
        for( var i = 0; i < $scope.answerDigits.length; i++ ) {
            ans.push( $scope.answerDigits[ i ].val );
        }
        return Number.parseInt( ans.join("") );
    };
    
    var isAnsComplete = function() {
        var isCompl = true;
        for( i = 0; i < $scope.equations[ $scope.equationIndex ].corAnsLength(); i++ ) {
            isCompl = isCompl && $scope.answerDigits[ i ].val;
        }
        return isCompl;
    };
    
    $scope.answerDigits = new Array();
    for( i = 0; i < 6; i++ ) {
        aDigit = new Object();
        aDigit.inx = i;
        aDigit.onDropSuccess = function( data, event ) {
            this.val = data;
            if( isAnsComplete() ) {
                $scope.equations[ $scope.equationIndex ]. 
                        submitPlayerAnswer( parsePlayerAnswer() );
                $timeout( function() { 
                    $scope.equationIndex++;
                    if( $scope.equationIndex === $scope.gameLength ) {
                        $scope.endGame();
                    }
                    $scope.answerDigits.clearValues();
                }, 1000 );
            }
        };
        aDigit.display = function() {
            return this.val ? this.val : "?";
        };
        $scope.answerDigits.push( aDigit );
    }
    $scope.answerDigits.clearValues = function() {
        for( i = 0; i < 6; i++ ) {
            this[ i ].val = null;
            this[ i ].show = ( i < $scope.equations[ $scope.equationIndex ]. 
                    corAnsLength() );
        }
    };

    // Keypad
    
    $scope.keypadDigits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
    
}]);

