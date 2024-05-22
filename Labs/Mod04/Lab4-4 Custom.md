# Lab 4-4 Custom Operators 

### Objectives

In this lab, you will write a custom operator that keeps only the multiples of a provided value from a stream of numbers.

---

Start with the code from th emultiplyBy example.

```typescript
import { Observable, Subscriber, TeardownLogic, OperatorFunction, interval } from 'rxjs';
import { map } from 'rxjs/operators';

// Custom operator that multiplies each value by a given factor
function multiplyBy(factor: number): OperatorFunction<number, number> {
  return (source: Observable<number>): Observable<number> => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      // Subscribe to the source observable
      const subscription = source.subscribe({
        next(value) {
          subscriber.next(value * factor);
        },
        error(err) {
          subscriber.error(err);
        },
        complete() {
          subscriber.complete();
        }
      });

      // Return the teardown logic to clean up the subscription
      return (): TeardownLogic => {
        console.log("Inner unsubscribe");
        subscription.unsubscribe();
      };
    });
  };
}

// Usage
const source$ = interval(1000); // Emits an ascending sequence of integers every 1000ms

const subscription = source$.pipe(
  multiplyBy(2)
).subscribe(value => console.log(value));

// Unsubscribe after a certain condition or time
setTimeout(() => {
  subscription.unsubscribe();
  console.log('Unsubscribed');
}, 5000);

```

Change the interval value to `interval(300)` so that you can see more data

Change all the occurrences of `multiplyBy` in the code to `multipleOf`

There is one line you have to change near the `subscriber.next()`
- This will replace the ` subscriber.next(value * factor);` line
- Instead we want to do `subscriber.next(value)` only if value is divisible by factor
- hint: wrap ` subscriber.next(value);` in an if block

The full solution is in the file lab4-4.ts

---

## End