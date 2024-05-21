
import { of } from 'rxjs';
import { scan, map } from 'rxjs/operators';

// random integers
const base$ = of(9,4,9,-3,-2,10,3)
 //.pipe(scan((acc, curr) => acc + curr, 0));
 //.pipe(map( x=> x * x),scan((acc, curr) => acc + curr, 0));
 //.pipe(scan((acc, curr) => acc * curr, 1));
 //.pipe(scan((acc, curr) => curr > acc ? acc = curr : acc = acc, -100));
// .pipe(scan((acc, curr) => curr < acc ? acc = curr : acc = acc, 100));
base$.subscribe(x => console.log(x));