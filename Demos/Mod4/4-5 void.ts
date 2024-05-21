import { Subject } from 'rxjs';

const subject = new Subject(); // Shorthand for Subject<void>

subject.subscribe({
  next: () => console.log('One second has passed'),
});

//setTimeout(() => subject.next(), 1000);
setTimeout(() => subject.next(null), 1000);