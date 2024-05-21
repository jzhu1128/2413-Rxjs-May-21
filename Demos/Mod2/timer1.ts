import { timer } from 'rxjs';

//const ob1$ = timer(2000); // Emits after 2 seconds
//ob1$.subscribe(value => console.log(value));

const ob2$ = timer(2000, 1000);
ob2$.subscribe(value => console.log(value));