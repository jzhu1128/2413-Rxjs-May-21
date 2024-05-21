import {of} from 'rxjs';

// random integers between -5 and 10
const base$ = of(9,4,9,-3,-2,10,3,6,-2,5,5,1,7,3,5,3,-4,9,2,3);

// check to see that the unfiltered stream looks like
base$.subscribe(x => console.log(x));