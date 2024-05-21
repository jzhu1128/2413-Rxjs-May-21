// Demo 3-9

import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);

//add 10 to each value
const example = source.pipe(map(val => val + 10));

const subscribe = example.subscribe(val => console.log(val));
