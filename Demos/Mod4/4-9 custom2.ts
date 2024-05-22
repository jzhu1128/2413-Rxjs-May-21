import { interval, Observable ,OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

// Custom operator that multiplies each value by a given factor
function multiplyBy(factor: number): OperatorFunction<number, number> {
  return (source: Observable<number>): Observable<number> => {
    return source.pipe(
      map(value => value * factor)
    );
  };
}


const sub =interval(1000).pipe(
  multiplyBy(2)
).subscribe(value => console.log(value));

setTimeout(() =>sub.unsubscribe(), 5000);

