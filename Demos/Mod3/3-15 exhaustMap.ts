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
