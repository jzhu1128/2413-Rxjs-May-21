import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
    const id = setInterval(() => {
        subscriber.next('hi');
    }, 1000);
});

observable.subscribe((x)=> console.log(x))
