# digIt-assess-sumIt
Addition equation drill app

# dev notes
This works, but in the present version neither the UI or the code are very pretty.
I ran into a couple of hitches with the angularJS framework that ate quite a few cycles
and required a significant amount of refactoring and kludging to get it to work:

Arrays used in ng-repeat directives can not have primitives as elements, because the
watch machinery that Angular uses to update the view without manually wiring events
depends on uniqueness of the array elements.  This is the reason for the extra layers
of indirection e.g. for the operand digit string values, and the consequent copying
of various data (which appears to be pointless).

The ng-show and ng-hide directives can not take function calls as values. This is the
reason for the existence of (and required update machinery for) object properties such 
as equation.isAnswerCorrect.

All the resources I can find (including working examples) indicate that the cache manifest
mechanism should work to render the iOS installed web app functional while offline. In
my hands, this does not work.  However, it appears that my development web server (the
one packaged with NetBeans) is serving the manifest file with an incorrect MIME type.
I have not had time to investigate this problem further.
