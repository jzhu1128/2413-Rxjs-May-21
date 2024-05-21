import { of } from 'rxjs';

const ob$ = of ("Goodbye", "Cruel", "World")

ob$.subscribe(value => console.log(value));
