[Are there any problems or code smells in the app? (Focus on code in the libs/books folder)]


Running Lighthouse returns this error:
PROTOCOL_TIMEOUT
```
Channel: DevTools
Initial URL: http://localhost:4200/
Chrome Version: 84.0.4147.125
Stack Trace: LHError: PROTOCOL_TIMEOUT
    at eval (devtools://devtools/remote/serve_file/@d0784639447f2e10d32ebaf9861092b20cfde286/lighthouse_worker/lighthouse_worker_module.js:1453:229)

So what are we fixing? 

Button element are visibly focused when you tab over them

SO TO MAKE "Want to Read" button more focusable:
we removed the [color='primary']
changed the button from mat-flat-button to mat-raised-button

The color change and border for focused buttons, made it more obvious when a button is on focus

Added aria-label, and matTooltip to button for more a11y

Added "Search [[no. of results]] results:" header above the search results for more context to page conten