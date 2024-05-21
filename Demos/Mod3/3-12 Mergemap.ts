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
