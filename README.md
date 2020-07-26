You can find the solution in the dist folder (already built for you)

If you want to build the project yourself you can do it by having nodejs and typing:
`npm install` followed by `make build`
To just run the tests you can do `make test` or `npm test`
`make` will both make and run the test.

My solution should work in any ES5 compliant browser, so IE9 +.
I tested in Firefox, Chrome, Canary, Opera and Safari on osx, as well in Chrome, Firefox and stock Browser on android, IE 11 on windows (ie9 through ie11 emulation).

A note about compatibility
==========================

It will be simple to make it work on all ES3 as the css is almost working on IE6, IE6 do not support the direct child selector (>) but I believe that just by making those selector generic descendant (by removing the >) the css should work as it is, as I used position relative and absolute which works out of the box in IE6.

The only exception is box-sizing which don't exists in IE<8, but while there are some htc to polyfill it, it could also ok if in IE6/7 browser the border overlaps, as their usage are very low.

As for the JS I used some methods not available in old ES3 browsers such Function#bind, Array#forEach as well as some Array.extras, all of them are very easy to polyfill, and it also easy to use a generic library like underscore/ lo-dash to workaround the problem.

I used the template tag just because I already had the [singlejs](https://github.com/kentaromiura/singlejs) project available, it's compatible with IE9+ as it writes styles tag using innerHTML, which is not supported by IE8, it will be easy to modify it to use CSSOM instead.

in the IE directory you'll find a proof of concept index.html file that works on IE8,
the only changes I had to do for it was to
- change the template tag to script type/template,
- change the util/getTemplate to work with the previous change
- add some basic (as in not full standard) polyfill to make it work (the ie.js file in the same directory).
