 # Core Operators

### Module Three

---

## Operators

- Operators are one of the core concepts in RxJS and in most forms of stream programming

- Operators in general manipulate streams of data
  - Creational operators create streams from data sources or collections
  - Pipeline operators transform one stream into another
  - Terminal operators transform the stream into a non-stream object or perform some final operation, like writing out the contents of the stream

- RxJs follows this exact pattern but introduces some of its own terminology

- For this section, we will be relying heavily on the documentation located at:
 
- [ReactiveX](https://reactivex.io/documentation/operators.html)
- [RxJS.dev](https://rxjs.dev/guide/operators)
- [learnrxjs.io](https://www.learnrxjs.io/learn-rxjs/operators)

- Note that we have already seen a number of operators already

---
# Piping Operators

- Operators are chained together using the `pipe()` command that can be used to apply a series of pipeable operators.
- For example, consider an observable created using `of` and a set of operators o1(), o2() and o3().
- The following is logically what happens when we apply a set of operators  

```typescript
const ob$ = of (1, 2, 3);
const obs1 = o1(ob$);
const obs2 = o2(ob1);
const obs3 = o3(ob2);

obs3.subscribe(x => console.log(x))
```
- Instead, we can just chain them together since we are usually only interested in the last obervable produced

```typescript
const ob$ = of(1,2,3).pipe(oo1(), o2(), o3())
ob$.subscribe(x => console.log(x))
```
---

## Operator Structure

- An operator applies a provided piece of logic to an observable
- The type of operator defines how that logic is to be applied
- For example `filter(p(x))` is an operator that applies the predicate function `p()` to each element
  - A predicate is a function that returns either true or false
  - if the result is false, the element is discarded
- The `map(t())` operators applies the function `t()` to each element to transform it somehow.

```typescript
// Demo 3-1 beer

import { Observable, from  } from "rxjs";
import {filter, map} from "rxjs/operators"

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50},
    {name: "Brooklyn Lager", country: "USA", price: 8.00},
    {name: "Sapporo", country: "Japan", price: 7.50}
];

const beer$ =from(beers).pipe(
    filter(beer => beer.price < 8),
    map(beer => beer.name + ": $" + beer.price)
)

beer$.subscribe({
    next: (x) => console.log(x),
    error: (err) => console.log(err),
    complete: () => console.log("Done"),
});
```
--- 

## Filtering - `skip` and `take`

- The `skip(n)` filter allows us to skip the first n elements from an observable
- the `take(n)` filter does the reverse, it allows us to take only the first n elements from an observable

```typescript

// Demo 3-2 

import {of} from 'rxjs';
import {skip, take} from 'rxjs/operators';

const b$ = of(1,2,3,4,5,6,7,8,9,0,11,12,13,15,16);

const skip5$ = b$.pipe(skip(5));
const take6$ = b$.pipe(take(6));

console.log("Skip execute");
skip5$.subscribe(x => console.log(x));

console.log("Skip execute");
take6$.subscribe(x => console.log(x));
```

---

## Filtering -  `takeLast` and `takeWhile`

- The `takeLast(n)` operator takes that last n elements of observable
- The `takeWhile(p)` takes elements while the predicate `p` is true

```typescript
// Demo 3-3

import {of} from 'rxjs';
import {takeLast, takeWhile} from 'rxjs/operators';

const b$ = of(1,2,3,4,5,6,7,8,9,10,1,1,13,15,16);

const tw$ = b$.pipe(takeWhile(x => x < 10));
const tl$ = b$.pipe(takeLast(4));

console.log("takeWhile execute");
tw$.subscribe(x => console.log(x));

console.log("takeLast execute");
tl$.subscribe(x => console.log(x));
```

---

## The until operators

- These either take or skip events until some signal is received from another observable

```typescript
// Demo 3-4

import { interval, timer } from 'rxjs';
import { skipUntil } from 'rxjs/operators';

//emit every 1s
const source = interval(1000);

//skip emitted values from source until inner observable emits (6s)
const example = source.pipe(skipUntil(timer(6000)));


const subscribe = example.subscribe(val => console.log(val));

```

## Distinct Operators

- `distinct()` filters out any duplicate elements from the stream
- However, this is not something that would be effective for an infinite stream

```typescript
// Demo 3-5

import {of} from 'rxjs';
import { distinct} from 'rxjs/operators';

const b$ = of(1,2,3,4,5,6,7,8,9,0,11,12,13,15,16,1,2,3,4,5,6,7,8,9,0,11)
    .pipe(distinct());

b$.subscribe(x => console.log(x));

```

- `distinctUntil()` filters out local duplicates
- It remembers the last value then throws out any duplicates until a new value occurs
- Note that this does not produce events that are globally disinct.

```typescript
// Demo 3-6

import {of} from 'rxjs';
import { distinctUntilChanged} from 'rxjs/operators';

const b$ = of(1,1,1,2,2,2,4,4,4,4,1,1,1,3,4,3,1,1,1)
    .pipe(distinctUntilChanged());

b$.subscribe(x => console.log(x));

```

## Debounce

- This is intended to filter out events that are coming too fast to be useful
- The term is from engineering and refers to the process of eliminating noise or glitches in signal inputs
- For example, when a user types into a search box, each keystroke can trigger a new search request, overwhelming the server or causing performance issues.
- A debounce function ensures that the event handler is not called too frequently by delaying the processing of the event until a specified period of inactivity has passed.

```typescript
// Demo 3-7
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

//emit four strings
const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');
/*
    Only emit values after a second has passed between the last emission,
    throw away all other values
*/
const debouncedExample = example.pipe(debounce(() => timer(1000)));
/*
    In this example, all values but the last will be omitted
    output: 'Last will display'
*/
const subscribe = debouncedExample.subscribe(val => console.log(val));
```

## Sample

- Rather than process every event, we may want to just sample the events
- For example when monitoring a sensor or gps data
- The sample() operator processes a subset of the stream sampled where each sample is triggered by another observable
- In the example, the timer observable is used to sample from the interval stream

```typescript
// Demo 3-8
import { interval } from 'rxjs';
import { sample } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);

//sample last emitted value from source every 2s
const example = source.pipe(sample(interval(2000)));

//output: 2..4..6..8..
const subscribe = example.subscribe(val => console.log(val));
```

---

## Transformations

- A transformation creates one or more new observables from an observable
- Technically, a filter is a transformation
- But we tend to reserve the term for operators that change the date

---

## Map

- The most common transformer is the `map()` operator
- In its simplest form it transforms on event into a different event

```typescript
// Demo 3-9

import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);

//add 10 to each value
const example = source.pipe(map(val => val + 10));

const subscribe = example.subscribe(val => console.log(val));

```

- `map()` is often used to change the shape of the data


```typescript
// Demo 3-10

import { from } from 'rxjs';
import { map } from 'rxjs/operators';


const source = from([
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 20 },
  { name: 'Ryan', age: 50 }
]);

const example = source.pipe(map(({ name }) => name));

const subscribe = example.subscribe(val => console.log(val));
```

---

## Scanning

- The `scan()` operator is an example of an accumulator or an operator that does some operation that reduces the stream to a single result
- For example, the following creates a running total of the elements in a stream

```typescript
// Demo 3-11
import { of } from 'rxjs';
import { scan } from 'rxjs/operators';

const source = of(1, 2, 3);

const example = source.pipe(scan((acc, curr) => acc + curr, 0));

const subscribe = example.subscribe(val => console.log(val));
```

## Reducing

- This is similar to `scan` but peforms the operation the whole stream
- This is the previous example but with `reduce` instead of `scan`

```typescript
import { of } from 'rxjs';
import { reduce } from 'rxjs/operators';

const source = of(1, 2, 3);

const example = source.pipe(reduce((acc, curr) => acc + curr, 0));

const subscribe = example.subscribe(val => console.log(val));
```
---

## Inner and Outer Observables

- The concept of inner and outer observables refers to the situation where observables emit other observables. 

1. **Outer Observable**: This is the main observable you start with. 

2. **Inner Observable**: When the outer observable emits an observable (instead of a simple value like a number or string), that emitted observable is called the inner observable.

### Example for Clarification

Imagine you have an observable that emits user IDs (outer observable). For each user ID, you want to fetch user details from a server, and this fetching process is also an observable (inner observable).

- **Outer Observable**: Emits user IDs (e.g., 1, 2, 3).
- **Inner Observable**: For each user ID, it emits user details (e.g., details for user 1, details for user 2, etc.).

### Using Operators

- Operators like `mergeMap`, `switchMap`, `concatMap`, and `exhaustMap` are used to handle the values emitted by the outer observable and subscribe to the inner observables
- They help in flattening the observables so that you can work with the actual emitted values (e.g., user details) instead of nested observables.

- **mergeMap**: Subscribes to each inner observable and merges their outputs.
- **switchMap**: Switches to a new inner observable and unsubscribes from the previous one whenever a new value is emitted by the outer observable.
- **concatMap**: Subscribes to inner observables one at a time, waiting for each to complete before moving to the next.
- **exhaustMap**: Ignores new inner observables if a previous one is still active.

### Visualization

1. **Outer Observable**: `[1, 2, 3]` (emits user IDs)
2. **Inner Observable** for each ID: `fetchUserDetails(1)`, `fetchUserDetails(2)`, etc.

Using `mergeMap`:

- Outer emits `1` → `fetchUserDetails(1)` starts.
- Outer emits `2` → `fetchUserDetails(2)` starts without waiting for `fetchUserDetails(1)` to complete.

Using `switchMap`:

- Outer emits `1` → `fetchUserDetails(1)` starts.
- Outer emits `2` → `fetchUserDetails(1)` is canceled, `fetchUserDetails(2)` starts.

Using `concatMap`:

- Outer emits `1` → `fetchUserDetails(1)` starts and completes.
- Outer emits `2` → `fetchUserDetails(2)` starts after `fetchUserDetails(1)` completes.

Using `exhaustMap`:

- Outer emits `1` → `fetchUserDetails(1)` starts.
- Outer emits `2` while `fetchUserDetails(1)` is still running → `fetchUserDetails(2)` is ignored.

This distinction helps manage complex asynchronous data flows in RxJS more effectively.

---

## MergeMap

```typescript
import { of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

// Outer observable that emits values 1, 2, and 3
const outerObservable = of(1, 2, 3);

// Inner observable factory function
const innerObservable = (value) => of(`Inner value from outer ${value}`).pipe(
  delay(1000) // Simulating a delay of 1 second for each inner observable
);

// Using mergeMap to handle inner observables
outerObservable.pipe(
  mergeMap(value => innerObservable(value))
).subscribe(result => console.log(result));

// Expected Output:
// Inner value from outer 1
// Inner value from outer 2
// Inner value from outer 3

```

### Explanation

1. **Outer Observable:** of(1, 2, 3) creates an observable that emits the values 1, 2, and 3 sequentially.
   
2. **Inner Observable:** The innerObservable function takes a value and returns a new observable that emits a string after a delay of 1 second.

3. **mergeMap:** The mergeMap operator is used to map each value from the outer observable to an inner observable. It subscribes to each inner observable and merges their emissions into a single observable.

4. **Subscription:** The subscribe method is used to handle the emissions from the merged observable and log them to the console.

### How It Works

- The outer observable emits 1, 2, and 3.

- For each value emitted by the outer observable, mergeMap creates an inner observable using the innerObservable function.

- Each inner observable waits for 1 second and then emits a string.The emissions from all inner observables are merged and logged to the console.

- With mergeMap, all inner observables start immediately without waiting for the previous ones to complete, which allows for concurrent handling of asynchronous tasks.

---

## concatMap

- The sample code is the almost the same for the previous

```typescript
import { of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

// Outer observable that emits values 1, 2, and 3
const outerObservable = of(1, 2, 3);

// Inner observable factory function
const innerObservable = (value) => of(`Inner value from outer ${value}`).pipe(
  delay(1000) // Simulating a delay of 1 second for each inner observable
);

// Using concatMap to handle inner observables
outerObservable.pipe(
  concatMap(value => innerObservable(value))
).subscribe(result => console.log(result));

// Expected Output (1 second apart each):
// Inner value from outer 1
// Inner value from outer 2
// Inner value from outer 3

```

- The difference from mergeMap is that concatMap subscribes to each inner observable one at a time and waits for it to complete before moving to the next one.

---

## switchMap

- Reusing the example.

```typescript
import { of, interval } from 'rxjs';
import {delay, take, switchMap, map } from 'rxjs/operators';

// Outer observable that emits values 1, 2, and 3 at 500ms intervals
const outerObservable = interval(500).pipe(
  take(3), // Limit to 3 emissions
  map(value => value + 1) // Transform 0, 1, 2 to 1, 2, 3
);

// Inner observable factory function
const innerObservable = (value) => of(`Inner value from outer ${value}`).pipe(
  delay(1000) // Simulating a delay of 1 second for each inner observable
);

// Using switchMap to handle inner observables
outerObservable.pipe(
  switchMap(value => innerObservable(value))
).subscribe(result => console.log(result));

// Expected Output:
// (At most one of the following will be logged due to switchMap behavior)
// Inner value from outer 1
// Inner value from outer 2
// Inner value from outer 3

```

- `switchMap` maps each value from the outer observable to an inner observable 
- If a new value is emitted by the outer observable before the inner observable completes, switchMap cancels the previous inner observable and switches to the new one

---

## exhaustMap

- `exhaustMap` ignores new inner observables if a previous one is still active
- you might only see the first value (Inner value from outer 1) because the inner observable's delay (1000ms) is longer than the interval between emissions (500ms)

```typescript

import { of, interval } from 'rxjs';
import { delay, take, map, exhaustMap } from 'rxjs/operators';

// Outer observable that emits values 1, 2, and 3 at 500ms intervals
const outerObservable = interval(500).pipe(
  take(3), // Limit to 3 emissions
  map(value => value + 1) // Transform 0, 1, 2 to 1, 2, 3
);

// Inner observable factory function
const innerObservable = (value) => of(`Inner value from outer ${value}`).pipe(
  delay(1000) // Simulating a delay of 1 second for each inner observable
);

// Using exhaustMap to handle inner observables
outerObservable.pipe(
  exhaustMap(value => innerObservable(value))
).subscribe(result => console.log(result));

// Expected Output:
// Inner value from outer 1

```

--- 

## Tapping

- The `tap()` operator allows you to tap into the stream and examine it at a given position - sort of like tapping a tree for sap
- The operator is intended to be used for debugging and development

```typescript

import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);
// transparently log values from source with 'tap'
const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
);

//'tap' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(val));


```

---

#### More operators later on

---

## End

