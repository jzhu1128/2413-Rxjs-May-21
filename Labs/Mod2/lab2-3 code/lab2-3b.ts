import {Observable} from 'rxjs';

const obs$ = new Observable((observer) => {
    let currentNumber = 1;
    const producer = setInterval(_ => {
        observer.next(currentNumber++);
    }, 1000);

    return () => clearInterval(producer)
});


const subscription = obs$.subscribe({ next: v => console.log('1st: ' + v)});
let subscription2;
setTimeout(() => {
     subscription2 = obs$.subscribe({ next: v => console.log('2nd: ' + v)});
}, 1000);

setTimeout(_ => {
    subscription.unsubscribe();
    subscription2.unsubscribe();
     console.log('Observable completed and cleaned up.');
}, 6_100);

