# Lab 4-3 Schedulers

### Objectives

- Understand the differences between asyncScheduler, asapScheduler, and queueScheduler.
- Observe the order of execution for tasks scheduled with these schedulers.

---

## Set up the test scheduler

The base observable is the `of`  code.

The testSchedular takes a scheduler as an argument and pipes the base observable through that scheduler.

The function prints out when the scheduler starts and stops.

``` typescript
import { of, asyncScheduler, asapScheduler, queueScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

// Helper function to create and subscribe to an observable with a given scheduler
function testScheduler(name: string, scheduler) {
  console.log(`${name} scheduler start`);

  const observable = of(1, 2, 3).pipe(observeOn(scheduler));
  observable.subscribe(value => console.log(`${name} scheduler received value: ${value}`));

  console.log(`${name} scheduler end`);
}
```

Now add in the specific schedular tests

```typescript

// Test with asyncScheduler
testScheduler('asyncScheduler', asyncScheduler);

// Test with asapScheduler
testScheduler('asapScheduler', asapScheduler);

// Test with queueScheduler
testScheduler('queueScheduler', queueScheduler);

// Immediate logging to show order of execution
console.log('Immediate log');

```
 

 ## Run the code

 You should see something like this

 ```console
 asyncScheduler scheduler start
asyncScheduler scheduler end
asapScheduler scheduler start
asapScheduler scheduler end
queueScheduler scheduler start
queueScheduler scheduler received value: 1
queueScheduler scheduler received value: 2
queueScheduler scheduler received value: 3
queueScheduler scheduler end
Immediate log
asapScheduler scheduler received value: 1
asapScheduler scheduler received value: 2
asapScheduler scheduler received value: 3
asyncScheduler scheduler received value: 1
asyncScheduler scheduler received value: 2
asyncScheduler scheduler received value: 3
 ```
 
 ## Explanation

#### asyncScheduler:

- Tasks are scheduled to run asynchronously, similar to using setTimeout.
- The emissions occur after the current synchronous code execution and after asapScheduler and queueScheduler tasks.

#### asapScheduler:
- Tasks are scheduled to run as soon as possible but after the current synchronous code execution.
- The emissions occur after queueScheduler but before asyncScheduler.

### queueScheduler:
- Tasks are scheduled to run synchronously in a queue-like fashion, but after the current synchronous code execution.
- The emissions occur immediately after the current synchronous code execution completes.

---

Code is in file lab4-3.ts

## End