
import {of} from 'rxjs';
import {takeLast, takeWhile} from 'rxjs/operators';

const b$ = of(1,2,3,4,5,6,7,8,9,10,1,1,13,15,16);

const tw$ = b$.pipe(takeWhile(x => x < 10));
const tl$ = b$.pipe(takeLast(4));

console.log("takeWhile execute");
tw$.subscribe(x => console.log(x));

console.log("takeLast execute");
tl$.subscribe(x => console.log(x));
