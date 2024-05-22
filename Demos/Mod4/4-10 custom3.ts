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

// Output:
// 0 (multiplied by 2 = 0, printed after 1 second)
// 2 (multiplied by 2 = 2, printed after 2 seconds)
// 4 (multiplied by 2 = 4, printed after 3 seconds)
// 6 (multiplied by 2 = 6, printed after 4 seconds)
// Unsubscribed (printed after 5 seconds)
