import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

// Create an observable that emits values and throws an error
const source$ = new Observable<number>((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.error('An error occurred!');
  observer.next(4); // This will not be emitted
  observer.complete();
});

// Handle the error using catchError and retry the observable 2 times
source$
  .pipe(
    map(value => {
      if (value === 2) {
        throw new Error('Value 2 is not allowed!');
      }
      return value;
    }),
    retry(2), // Retry the observable 2 times before handling the error
    catchError(err => {
      console.error('Error caught:', err);
      return of(-1); // Return a default value when an error occurs
    })
  )
  .subscribe({
    next(value) {
      console.log('Received value:', value);
    },
    error(err) {
      console.error('Subscription error:', err);
    },
    complete() {
      console.log('Completed');
    }
  });
