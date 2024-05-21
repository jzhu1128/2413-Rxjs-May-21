# Core Concepts of Reactive Programming 2

### Module Four

---

## Subjects

- A subject is a special type of observable multicasts values to multiple observers
- Observables are unicast because each subscribed observer has an independent subscription
- Subjects are multicast.


- Observers subscribe to subjects the same as with observables
- Internally, the subject has a list of subscribers and processes the data for each exactly the same


- Subjects are also observers
- They usually take data from an observable or events source using the `next()` and other callbacks and then relay it to its subscribers


- In the simple case below, the callbacks are being invoked on the subject which in turn pushes them to subscribers

```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(1);
subject.next(2);

```

- In this example, the subject is an observable as well and multicasts the emitted events of the source observable

```typescript
import { Subject, from } from 'rxjs';

const subject = new Subject<string>();

subject.subscribe({
  next: (v) => console.log(`observer one: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observer two: ${v}`),
});

// define the source observable

const source$ = from(["Goodbye","Cruel", "World"]);

source$.subscribe(subject); 
```

---

## BehaviorSubject

- The BehaviorSubject remembers the latest value emitted to its consumers
- Whenever a new Observer subscribes, it will immediately receive the "current value" from the BehaviorSubject
- This is usually used to represent the current 'state' of the subject

```typescript
import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observer 1: ${v}`),
});

// Observer 1 will get the inital state and the next three values
subject.next(1);
subject.next(100);

// At this point 100 is the current state
// When Observer 2 subscribes, they will get the current state 100
// even if no new items are emitted.

subject.subscribe({
  next: (v) => console.log(`observer 2: ${v}`),
});

subject.next(3);
```

---

## ReplaySubject

- A ReplaySubject records multiple values from the Observable execution and replays them to new subscribers
- When creating a ReplaySubject, you can specify how many values to replay

```typescript
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(5);

```

## Asynch Subject

- Only the last value of the Observable execution is sent to its observers, and only when the execution completes.

```typescript
import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(5);
subject.complete();

// Logs:
// observerA: 5
// observerB: 5
```

---

## Void subject

- Used only when the occurrence of the event is important, not the value

```typescript
import { Subject } from 'rxjs';

const subject = new Subject(); // Shorthand for Subject<void>

subject.subscribe({
  next: () => console.log('One second has passed'),
});

setTimeout(() => subject.next(), 1000);

```
---

## Scheduler

- A scheduler is like a traffic manager for the tasks you want to perform
- It determines when and how your tasks (like emitting values from an observable) are executed
- Think of it as a way to control the timing and order of your observable operations.


#### How Schedulers Work

Schedulers in RxJS manage:

- When tasks start: They control the exact time when a task begins
- How tasks are ordered: They ensure tasks are executed in a specific sequence.
- Concurrency: They manage how many tasks can run simultaneously.

#### Types of Schedulers

RxJS provides several built-in schedulers, each suited for different use cases:

1. **asapScheduler:** Schedules tasks to execute as soon as possible, but after the current synchronous code has finished executing.
2. **asyncScheduler:** Schedules tasks to execute asynchronously, like using setTimeout.
3. **queueScheduler:** Schedules tasks to execute in a queue, one after the other, in a synchronous manner.
4. **animationFrameScheduler:** Schedules tasks to execute just before the next browser repaint, useful for animations.

#### Example without scheduling

```typescript
iimport { Observable, asyncScheduler } from 'rxjs';
import {observeOn} from 'rxjs/operators'

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});
//.pipe(observeOn(asyncScheduler));

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
```

- Using asyncScheduler in this context ensures that any side effects or actions performed in the subscription (like logging to the console) happen after the current synchronous operations are completed

```typescript
import { Observable, asyncScheduler } from 'rxjs';
import {observeOn} from 'rxjs/operators'

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete()
})
.pipe(observeOn(asyncScheduler));

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');

```
