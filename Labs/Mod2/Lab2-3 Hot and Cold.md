# Lab 2-3 Hot and Cold Observables

_This lab is based on code by Ronnie Schaniel_


In this lab, you will explore the difference between a cold or unicast observable and a hot or mulitcast observable.

A cold observable is defined as:

_An observable is “cold” when it creates a new producer during subscribe for every new subscription. As a result, “cold” observables are always unicast, being one producer observed by one consumer. Cold observables can be made hot but not the other way around._

A hot observable is defined as:

_An observable is “hot”, when its producer was created outside of the context of the subscribe action. This means that the “hot” observable is almost always multicast. It is possible that a “hot” observable is still technically unicast, if it is engineered to only allow one subscription at a time, however, there is no straightforward mechanism for this in RxJS, and the scenario is an unlikely one. For the purposes of discussion, all “hot” observables can be assumed to be multicast. Hot observables cannot be made cold._

In more succinct terms

- A cold observable creates a new data producer for each subscriber
- A hot observable means that each subscriber shares the data from the same producer starting at the moment of subscription

---

## Part 1  - Set up the Producer

Use the following code.

```typescript
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

```
This code is found in file lab2-3a.ts

The the subscription automatically stops after the timeout and the clearInterval stops the producer

Run the code and notice that it is exactly as you would expect.

## Part 2 - Multiple Subscribers

Add an additional subscriber but wait a bit for it to start. Notice that the observable code is unchanged.

```typescript
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
```
 The code for this part is in file lab2-3b.ts

 Run this an notice that each subscriber gets their own copy of the data. There are two interval producers, one for each subscription context

 ## Part 3 - Turn up the heat

 The problem we often face is that this is not realistic. In the cold case, the observables created a new copy of the producer for each subscription.

 To make the cold observable hot, we add the `share()` operator to it as in the following:

 ```typescript
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

 ```

 Notice that we have increased the delay for the second subscription. 

 This code is file lab2-3c.ts

 Run the code and note that the second subscriber does not receive the generated values that were emitted before joining. The two subscribers get the same sequence from the point each joined.

 ---

 ## End