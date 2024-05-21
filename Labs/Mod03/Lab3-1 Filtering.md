# Lab 3-1 Using the Filter Operators

In this lab, you will use the filter operators to manipulate data from a data source


## Part 1 - Create the base observable

  For this section, we will just use a random bunch of numbers


```typescript
import {of} from 'rxjs';

// random integers between -5 and 10
const base$ = of(9,4,9,-3,-2,10,3,6,-2,5,5,1,7,3,5,3,-4,9,2,3);

// check to see that the unfiltered stream looks like
base$.subscribe(x => console.log(x));
```

Run this and confirm that you are actually getting the stream to print

The code in in file lab3-1a.ts;

---

## Part 2 - Filtering

This section will require you to use some of the filters we did not discuss in class.

#### Part 2

1. Remove all the negative numbers (hint use `filter()`)
2. Remove all the even numbers (hint use `filter()`)
3. Remove all the negative even numbers  (hint use `filter()`)
4. Find the first number in the sequence greater than 9 (hint use `find()`)
5. What happens when you try to find the first number > 15?
6. Find the first even number (hint use `filter()` and `first()`)
7. Find the all the distinct even positive numbers (hint use `distinct()`)
8. Find all the positive numbers that occur before 10 in the stream (hint use `takeWhile()`)
9. Find the first 6 positive numbers (hint: use `take()`)

The solutions are in file lab3-1b.ts

---

## End
