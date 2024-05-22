import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

// Custom operator that multiplies each value by a given factor
function multiplyBy(factor: number): OperatorFunction<number, number> {
  return (source: Observable<number>): Observable<number> => {
    return source.pipe(
      map(value => value * factor)
    );
  };
}

// Usage
const source$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

source$.pipe(
  multiplyBy(2)
).subscribe(value => console.log(value));

