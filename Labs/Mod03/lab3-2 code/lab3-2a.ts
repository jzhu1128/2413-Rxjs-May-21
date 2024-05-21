import {of} from 'rxjs';
import {map, tap} from 'rxjs/operators'

// random integers between -5 and 10
const base$ = of(9,4,9,-3,-2,10,3,6,-2,5,5,1,7,3,5,3,-4,9,2,3)
.pipe(
    tap(x => console.log(`Before map 1: ${x}`)),
    map( x => x <0  ? -x : x),
    tap(x => console.log(`Before map 2: ${x}`)),
    map(x => x * x * x),
    tap(x => console.log(`After map 2: ${x}`)));

// check to see that the unfiltered stream looks like
base$.subscribe(x => console.log(x));