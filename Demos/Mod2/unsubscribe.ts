import { interval } from 'rxjs';

const ob$ = interval(1000); // Emits values every second
const s = ob$.subscribe(value => console.log(value));

setTimeout(() =>s.unsubscribe(), 5000);
