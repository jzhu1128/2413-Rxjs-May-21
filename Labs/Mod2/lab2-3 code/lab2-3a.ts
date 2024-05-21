
import {Observable} from 'rxjs';


const obs$ = new Observable((observer) => {
    let currentNumber = 1;
    const producer = setInterval(_ => {
        observer.next(currentNumber++);
    }, 1000);

    return () => clearInterval(producer)
});

const subscription = obs$.subscribe(console.log);

setTimeout(_ => {
    subscription.unsubscribe();
    console.log('Observable completed and cleaned up.');
}, 5_100);
