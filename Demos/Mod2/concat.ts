import { concat, of } from 'rxjs';

const obs1$ = of(1, 2, 3);
const obs2$ = of('a', 'b', 'c');
const con$ = concat(obs1$, obs2$);
con$.subscribe(value => console.log(value));