[Are there any problems or code smells in the app? (Focus on code in the libs/books folder)]
1.
[redundant 'await' on a non-promise]
- return await this.books.search(term);

== return this.books.search(term);

2.
The tslint.json was missing a number of recommended rules and best practices. This would come to bite us later as the project grows in size

A good way to address this would be to include ```"extends": ["tslint:recommended", "tslint-sonarts"],``` in your tslint.json file

3.
export const getAllBooks = createSelector<
  BooksPartialState & ReadingListPartialState,
  Book[],
  Record<string, ReadingListItem>,
  ReadingListBook[]
>(getBooks, getReadingListEntities, (books, entities) => {
  return books.map(b => ({ ...b, isAdded: Boolean(entities[b.id]) }));
});

===>

export const getAllBooks = createSelector<
  BooksPartialState | ReadingListPartialState,
  Book[],
  Record<string, ReadingListItem>,
  ReadingListBook[]
>(getBooks, getReadingListEntities, (books, entities) => {
  return books.map(b => ({ ...b, isAdded: Boolean(entities[b.id]) }));
});


why?
An intersection type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need. However an intersection with a type without that is a subset of the other doesn't really change the resulting type

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

Added aria-label, and matTooltip to all buttons on the page for a11y

Added "Search [[no. of results]] results:" header above the search results for more context to page content