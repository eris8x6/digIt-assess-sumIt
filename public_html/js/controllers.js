/* Controller Module */

var sumItCtlr = angular.module( 'SumItCtlr', ['Engine'] );

sumItCtlr.controller( "MainMenuCtlr", function( $scope, $location ) {
    
    $scope.newGame = function() {
        $location.path( "/equation/" );
    };
   
});

sumItCtlr.controller( "EquationScreenCtlr", function( $scope, $location ) {
    var i, aDigit;
    var correctDigits = 3;
    
    $scope.operand1 = [ '1', '0', '7' ];
    $scope.operand2 = [ '4', '3', '2' ];
    
    $scope.answerDigits = new Array();
    for( i = 0; i < correctDigits; i++ ) {
        aDigit = new Object();
        aDigit.val = "X" + i;
        aDigit.onDropSuccess = function( data, event ) {
            this.val = data;
        };
        $scope.answerDigits.push( aDigit );
    }
    
    $scope.keypadDigits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
    
    $scope.onDropSuccess = function( data, event ) {
        $scope.userAnswer[ 0 ] = data;
    };

});

sumItCtlr.controller( "EndOfGameCtlr", function( $scope, $location ) {
});

//canDoCtlr.controller( "ActListCtlr", [ "$scope", "ActList", 
//    function( $scope, ActList ) {
//    /* implement Activity list controller */
//    $scope.activities = ActList();
//    
//    $scope.doneButton = function( act ) {
//        act.complete();
//    };
//    
//    $scope.deleteButton = function( act ) {
//        act.cancel();
//    };
//    
//    $scope.postponeButton = function( act ) {
//        act.postpone();
//    };
//
//    $scope.upButton = function( act ) {
//        act.raisePrio();
//    };
//    
//    $scope.downButton = function( act ) {
//        act.lowerPrio();
//    };
//    
//}]);
//
//canDoCtlr.controller( "NewActFormCtlr", [ "$scope", "ActList", "Activity",
//    function( $scope, ActList, Activity ) {
//
//    var addActivity;
//    
//    $scope.newActData = {};
//            
//    addActivity = function() {
//        var act = new Activity( $scope.newActData );
//        ActList().push( act );
//        return act;
//    };
//    
//    $scope.actNameEnter = function( keyCode ) {
//        var act;
//        if ( keyCode === 13 ) {
//            act = addActivity().queue();
//            if ( $scope.viewMode === "backlog" ) {
//                act.postpone();
//            }
//        }
//    };
//    
//    $scope.queueButton = function() {
//        addActivity().queue();
//    };
//    
//    $scope.workButton = function() {
//        addActivity().queue().doWork();
//    };
//    
//    $scope.backlogButton = function() {
//        addActivity().queue().postpone();
//    };
//    
//}]);
