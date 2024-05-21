import { from } from 'rxjs';

let cheeses = ["Brie", "Gouda", "Tilsit", "Cheddar"];

const ob$ = from(cheeses);

ob$.subscribe(value => console.log(value));
