import { Observable, Subscriber, TeardownLogic, OperatorFunction, interval } from 'rxjs';
import { map } from 'rxjs/operators';

// Custom operator that multiplies each value by a given factor
function multipleOf(factor: number): OperatorFunction<number, number> {
  return (source: Observable<number>): Observable<number> => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      // Subscribe to the source observable
      const subscription = source.subscribe({
        next(value) {
            if (value % factor == 0 ) {
                subscriber.next(value);
            }
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
const source$ = interval(300); // Emits an ascending sequence of integers every 1000ms

const subscription = source$.pipe(
    multipleOf(3)
).subscribe(value => console.log(value));

// Unsubscribe after a certain condition or time
setTimeout(() => {
  subscription.unsubscribe();
  console.log('Unsubscribed');
}, 5000);


