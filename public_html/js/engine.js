/* SumIt game engine and utilities */

var engine = angular.module( 'Engine', [] );

engine.constant( 'GameConstants', 
    {
        'ProblemCount': 2,
        'OperandMin': 10,
        'OperandMax': 100 // 100000
    }
);

engine.service( 'Utilities', [ 'GameConstants', function( gameConstants ) {
        var utilities = new Object();
        utilities.operandFactory = function() {
            var operand = new Array();
            operand.value = gameConstants.OperandMin + Math.floor( Math.random() *
                    ( gameConstants.OperandMax - gameConstants.OperandMin ) );
            operand.text = operand.value.toString();
            for( var i = 0; i < operand.text.length; i++ ) {
                var dig = new Object();
                dig.val = operand.text.charAt( i );
                operand.push( dig );
            }
            return operand;
        };
        utilities.drillFunction = function( a, b ) {
            return a + b;
        };
        return utilities;
}]);

engine.service( 'CurrentGame', [ 'Game', function( Game ) {
        var currentGame = new Object();
        currentGame.newGame = function() {
            currentGame.game = new Game();
        };
        return currentGame;
}]);


engine.factory( 'Equation', [ 'Utilities', function( utilities ) {
        return function() {
            var equation = new Object();
            equation.firstOperand = utilities.operandFactory();
            equation.secondOperand = utilities.operandFactory();
            equation.actualAnswer = utilities.drillFunction( 
                    equation.firstOperand.value,
                    equation.secondOperand.value );
            equation.displayAnswer = new Array();
            equation.displayAnswer.text = equation.actualAnswer.toString();
            for( var i = 0; i < equation.displayAnswer.text.length; i++ ) {
                var dig = new Object();
                dig.val = equation.displayAnswer.text.charAt( i );
                equation.displayAnswer.push( dig );
            }
            equation.playerAnswerDisplay= function() {
                var pAD = new Array();
                var pADText = equation.playerAnswer.toString();
                for( var i = 0; i < pADText.length; i++ ) {
                    var dig = new Object();
                    dig.val = pADText.charAt( i );
                    pAD.push( dig );
                }
                return pAD;
            };
            equation.isAnswerCorrect = function() {
                return ( this.playerAnswer === this.actualAnswer );
            };
            equation.corAnsLength = function() {
                return this.actualAnswer.toString().length;
            };
            return equation;
        };
}]);

engine.factory( 'Game', [ 'Equation', 'GameConstants', 
    function( Equation, gameConstants ) {
        return function() {
            var i;
            var c = false;
            var game = new Array();
            for( i = 0; i < gameConstants.ProblemCount; i++ ) {
                game.push( new Equation() );
            }
            game.index = 0;
            game.next = function() {
                this.index++;
                if( this.index >= this.length ) {
                    c = true;
                }
            };
            game.currentEq = function() {
                return this[ this.index ];
            };
            game.complete = function() {
                return c;
            };
            return game;
        };
}]);