
import { interval, timer } from 'rxjs';
import { skipUntil } from 'rxjs/operators';

//emit every 1s
const source = interval(1000);

//skip emitted values from source until inner observable emits (6s)
const example = source.pipe(skipUntil(timer(6000)));


const subscribe = example.subscribe(val => console.log(val));