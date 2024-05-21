import {of} from 'rxjs';
import { distinctUntilChanged} from 'rxjs/operators';

const b$ = of(1,1,1,2,2,2,4,4,4,4,1,1,1,3,4,3,1,1,1)
    .pipe(distinctUntilChanged());

b$.subscribe(x => console.log(x));