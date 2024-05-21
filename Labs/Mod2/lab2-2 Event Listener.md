# Lab 2-2 An Event Listener Observable

In this lab, you will create observable that pushes events from a webpage 

## Part 1 - Setting up the Web Page

Create the following dummy webpage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RxJS Click Logger</title>
</head>
<body>
    <button id="myButton">Click Me!</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.5.5/rxjs.umd.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

Notice that the RsJS library is loaded.

Now add the app.js code

```typescript
// Importing the required functions from RxJS
const { fromEvent } = rxjs;
const { map } = rxjs.operators;

// Selecting the button element
//const button = document.getElementById('myButton');

// Creating an Observable from button clicks
const click$ = fromEvent(button, 'click');


// Subscribing to the Observable to log the clicks
clicks$.pipe(
  map(event => `Mouse clicked at coordinates: (${event.clientX}, ${event.clientY})`)
).subscribe(message => console.log(message));

```

Start the web page using live server and open the developer console

Confirm that the button clicks are being pushed to console


## Part 2 - Changing the event source

Change the observable so that it pushes any button click from anywhere on the document. This is just changing the source of the clicks that the observable is monitoring

Try out your changes

The solution is in the file app2.js

---

## End Lab