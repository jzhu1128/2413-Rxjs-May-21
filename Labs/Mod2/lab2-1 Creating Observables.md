# Lab 2-1 Creating Observables and Observers

In this lab, you will create observables using several of the methods covered in the class material.

## Part 1 - Using a constructor

Create an observable `ob$` using the constructor that implements the following `subscribe()` method.

Notice that since we are using the `Subscriber` data type for `sub` parameter, we have to specify the type of data the subscriber is receiving.

If you use the typed subscriber, you should type the observable
as well.

Experiement with different options for typing the 

```typescript
function subscribe(sub :Subscriber<string>) {
    sub.next("Goodbye");
    sub.next("Cruel");
    sub.next("World");
    sub.complete();
}
```

Next, create a Observer called `client`. Remember that this can just be a collection of callbacks that implement `next()`, `error()` and `complete`.
- The `next()` and `error()` methods should just print out the payload of the method and the `complete()` method should just print out "Done"

Subscribe the client to the observable and create a `Subscription` object. Remember that this has the effect of executing the `subscribe()` function.

Then finally, unsubscribe using the subscription object.

The solution is in the file `lab2-1-1a.ts`

#### Variations

1. Move the contents of the `subscribe()` function into the constructor argument and eliminate the named

2. Eliminate the `client` object by providing the callbacks directly to the `subscribe()` function

A solution is the file `lab2-1-1b.ts`

---

## Part 2 - Creating from Collections

Rework the solution in part 1 in two different ways, the first using the `of` operator and the second using the `from` operator. Use the demos as an example of what your code should resemble.

Remember that you don't need to provide a `subscribe()` method since it is implicit.

Also combine the two observables you created using `concat` and `merge` into new observables you can subscribe to.

Can you explain why the result of the `concat` and `merge` are the same? 

A solution is the file `lab2-1-2.ts`

---

## Part 3 - Challenge

Run the following code and observe the output

```typescript
import { interval , concat, of } from 'rxjs';

const ob1$ = interval(1000); // Emits values every second
const ob2$ = of ("a", "b", "c"); // Emits values every second
const ob$ = concat(ob1$, ob2$);
//const ob$ = concat(ob2$, ob1$);
ob$.subscribe(value => console.log(value));

```
The run the code using the second `concat` statement instead

Explain the results


---

## End Lab