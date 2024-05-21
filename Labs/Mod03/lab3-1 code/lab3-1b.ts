import {of} from 'rxjs';
import {filter, find,first, distinct,last, takeWhile, take}  from 'rxjs/operators';

// random integers between -5 and 10
const base$ = of(9,4,9,-3,-2,10,3,6,-2,5,5,1,7,3,5,3,-4,9,2,3)
    //.pipe(filter( x => x >= 0));
    //.pipe(filter( x => 0 == x % 2 ));
    //.pipe(filter( x => (0 == x % 2) && (x < 0 )));
   // .pipe(find(x => x > 9));
    //.pipe(find(x => x == 11));
   // .pipe(filter( x => 0 == x % 2 ),first());
    //.pipe(filter(x => x > 0),filter( x => 0 == x % 2 ),distinct());
   // .pipe(takeWhile( x => x < 10),filter(x => x > 0));
      .pipe(filter(x => x > 0), take(6));


// check to see that the unfiltered stream looks like
base$.subscribe(x => console.log(x));