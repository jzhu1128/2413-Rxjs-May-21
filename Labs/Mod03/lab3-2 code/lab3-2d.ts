import { of } from 'rxjs';
import { scan } from 'rxjs/operators';

// random integers
const base$ = of(9,4,9,-3,-2,10,3);

// check to see that the unfiltered stream looks like
base$.subscribe(x => console.log(x));