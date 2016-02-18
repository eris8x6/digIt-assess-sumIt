/* SumIt game engine and utilities */

var engine = angular.module( 'Engine', [] );

engine.constant( 'GameConstants', 
    {
        'EquationCount': 5,
        'OpDigitsMin': 2,
        'OpDigitsMax': 5
    }
);

engine.service( 'Utilities', [ 'GameConstants', function( gConsts ) {
        var utilities = new Object();
        utilities.operandFactory = function() {
            var opLen, opBase;
            var operand = new Array();
            
            // Distribute the operands evenly among the specified lengths
            // Because I got tired of entering 5-digit answers
            
            opLen = gConsts.OpDigitsMin + Math.floor( Math.random() *
                    ( gConsts.OpDigitsMax - gConsts.OpDigitsMin ));
            opBase = Math.pow( 10, ( opLen - 1 ) );
            operand.value = Math.floor( 9 * opBase * Math.random() + opBase );
            
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

engine.factory( 'Equation', [ 'Utilities', function( utilities ) {
        return function( orientation ) {
            var equation = new Object();
            equation.orientation = orientation;
            equation.isComplete = false;
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
            equation.submitPlayerAnswer = function( answer ) {
                this.isComplete = true;
                this.isAnswerCorrect = ( answer === this.actualAnswer );
                this.playerAnswerDisplay = new Array();
                var pADText = answer.toString();
                for( var i = 0; i < pADText.length; i++ ) {
                    var dig = new Object();
                    dig.val = pADText.charAt( i );
                    this.playerAnswerDisplay.push( dig );
                }
            };
            equation.corAnsLength = function() {
                return this.actualAnswer.toString().length;
            };
            return equation;
        };
}]);
