/* SumIt game engine and utilities */

var engine = angular.module( 'Engine', [] );

engine.constant( 'GameConstants', 
    {
        'ProblemCount': 5,
        'OperandMinSize': 2,
        'OperandMaxSize': 5
    }
);

engine.service( 'GameFunctions', [ 'GameConstants', function( gameConstants ) {
        var gameFunctions = new Object();
        gameFunctions.makeOperand = function() {
            return 277;
        };
        gameFunctions.drillFunction = function( a, b ) {
            return a + b;
        };
        return gameFunctions;
}]);

engine.service( 'Utilities', function() {
    var utilities = new Object();
    utilities.digits = function( number ) {
        return [ '3', '9', '4', '2' ];
    };
    utilities.number = function( digits ) {
        return 7904;
    };
    return utilities;
});

engine.factory( 'Equation', [ 'GameFunctions', function( gameFunctions ) {
        var equation = new Object();
        equation.firstOperand = gameFunctions.makeOperand();
        equation.secondOperand = gameFunctions.makeOperand();
        equation.actualResult = gameFunctions.drillFunction( equation.firstOperand, 
            equation.secondOperand );
        equation.correctAnswer = function() {
            return ( equation.playerAnswer === equation.actualResult );
        };
        return equation;
}]);

engine.factory( 'Game', [ 'Equation', 'GameConstants', 
    function( equation, gameConstants ) {
        var i;
        var c = false;
        var game = new Array();
        for( i = 0; i < gameConstants.ProblemCount; i++ ) {
            game.push( new equation() );
        }
        game.index = 0;
        game.next = function() {
            game.index++;
            if( game.index >= game.length ) {
                c = true;
            }
        };
        game.current = function() {
            return game[ game.index ];
        };
        game.complete = function() {
            return c;
        };
}]);