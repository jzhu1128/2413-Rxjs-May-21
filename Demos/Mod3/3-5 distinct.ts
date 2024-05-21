import {of} from 'rxjs';
import { distinct} from 'rxjs/operators';

const b$ = of(1,2,3,4,5,6,7,8,9,0,11,12,13,15,16,1,2,3,4,5,6,7,8,9,0,11)
    .pipe(distinct());

b$.subscribe(x => console.log(x));
