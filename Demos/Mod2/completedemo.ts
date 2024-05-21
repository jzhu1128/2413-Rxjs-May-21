import { Observable } from 'rxjs';

const o$ = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  //subscriber.error();
  subscriber.next(4); // Is not delivered because it would violate the contract
});

o$.subscribe(x => console.log(x))
