import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';

const obs$ = new Observable((observer) => {
    let currentNumber = 1;
    const producer = setInterval(_ => {
        observer.next(currentNumber++);
    }, 1000);

    return () => clearInterval(producer)
}).pipe(share());

const subscription = obs$.subscribe({ next: v => console.log('1st: ' + v)});
let subscription2;
setTimeout(() => {
     subscription2 = obs$.subscribe({ next: v => console.log('2nd: ' + v)});
}, 3000);

setTimeout(_ => {
    subscription.unsubscribe();
    subscription2.unsubscribe();
     console.log('Observable completed and cleaned up.');
}, 6_100);

