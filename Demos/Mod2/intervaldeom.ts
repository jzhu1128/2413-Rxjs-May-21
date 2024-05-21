import { interval } from 'rxjs';

const ob$ = interval(1000); // Emits values every second
ob$.subscribe(value => console.log(value));