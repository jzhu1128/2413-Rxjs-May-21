
import { of } from 'rxjs';
import { reduce, map } from 'rxjs/operators';

// random integers
const base$ = of(9,4,9,-3,-2,10,3)
 //.pipe(reduce((acc, curr) => acc + curr, 0));
 //.pipe(map( x=> x * x),reduce((acc, curr) => acc + curr, 0));
 //.pipe(reduce((acc, curr) => acc * curr, 1));
 //.pipe(reduce((acc, curr) => curr > acc ? acc = curr : acc = acc, -100));
//.pipe(reduce((acc, curr) => curr < acc ? acc = curr : acc = acc, 100));
base$.subscribe(x => console.log(x));