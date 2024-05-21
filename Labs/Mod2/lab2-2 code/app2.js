// Importing the required functions from RxJS
const { fromEvent } = rxjs;
const { map } = rxjs.operators;

// Selecting the button element


// Creating an Observable from button clicks
const click$ = fromEvent(document, 'click');


// Subscribing to the Observable to log the clicks
clicks$.pipe(
  map(event => `Mouse clicked at coordinates: (${event.clientX}, ${event.clientY})`)
).subscribe(message => console.log(message));
