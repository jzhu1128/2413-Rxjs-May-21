// Lab 2.1.3 Challenge

import { interval , concat, of } from 'rxjs';

const ob1$ = interval(1000); // Emits values every second
const ob2$ = of ("a", "b", "c"); // Emits values every second
const ob$ = concat(ob1$, ob2$);
//const ob$ = concat(ob2$, ob1$);
ob$.subscribe(value => console.log(value));