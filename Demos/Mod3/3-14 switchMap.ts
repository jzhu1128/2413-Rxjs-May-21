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
