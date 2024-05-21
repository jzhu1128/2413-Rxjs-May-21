import { combineLatest, of } from 'rxjs';

const obs1$ = of(1, 2, 3);
const obs2$ = of('a', 'b', 'c');
const latest$ = combineLatest([obs1$, obs2$]);
latest$.subscribe(([value1, value2]) => {
  console.log(value1, value2);
});
