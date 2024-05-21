import { merge, interval } from 'rxjs';

const obs1$ = interval(1000); 
const obs2$ =interval(1000); 

const m$ = merge(obs1$, obs2$);
m$.subscribe(value => console.log(value));
