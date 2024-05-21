
import {of} from 'rxjs';
import {skip, take} from 'rxjs/operators';

const b$ = of(1,2,3,4,5,6,7,8,9,0,11,12,13,15,16);

const skip5$ = b$.pipe(skip(5));
const take6$ = b$.pipe(take(6));

console.log("Skip execute");
skip5$.subscribe(x => console.log(x));

console.log("Skip execute");
take6$.subscribe(x => console.log(x));
