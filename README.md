# digIt-assess-sumIt
Addition equation drill app

# dev notes
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

As it stands in the current version, the UI looks OK (much better than the previous
version).  The code is not nearly as clean as I would like it.  In particular, the
html files easily could be collapsed (the partials that represent the three UI pages
are nearly empty), and the view code for the equations should be de-duplicated
between the equation view and the end-of-game view.

# design notes
There are a few things that work according to spec, but in practice turn out to have
functional issues for the user.  In a real development situation, I'd certainly want
to pull the design team into the loop and suggest modifications:

There is no way for the user to correct a drag error in the last digit of their
answer, because completion of the answer boxes triggers immediate scoring and display
of the next equation.

Because the distribution of equation sizes (i.e. number of digits in the operands)
is not specified, the simple solution I've coded results in 90% of the operands having
the maximum number of digits.  This probably isn't what the designer had in mind.
Actually, I fixed this one because it was driving me bonkers during testing. 

The row of boxes containing digits 0-9 is very wide compared to the vertical-format
equations, and also only just fits (at a reasonable font size) onto a portrait
oriented phone screen.  I'd recommend using a 3x4 numeric keypad in those situations.
