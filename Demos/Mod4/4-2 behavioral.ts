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