# Lab 3-2 Using the Transform Operators

In this lab, you will use the transformation operators to manipulate data from a data source


## Part 1 - A simple data transformation

  For this section, we will just use the same set of numbers as the last lab

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

### Do the mapping

Now apply two map operations to:

1. Convert the negative numbers to positive 
2. Cube the number

The solution is in file lab3-2a.ts

---

## Part 2 - Data Modification

For this section, use the following beer data found in the file lab3-2b.ts

```typescript
import { from  } from "rxjs";

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50},
    {name: "Brooklyn Lager", country: "USA", price: 8.00},
    {name: "Sapporo", country: "Japan", price: 7.50},
    {name: "Labatts", country: "Canada", price: 7.75},
    {name: "Coors", country: "USA", price: 8.50},
    {name: "Carib", country: "Trinidad", price: 9.00},

];

const beers$ = from(beers).subscribe(x => console.log(x));
```

1. Filter out only the American beers
2. Convert the data object into just the name for the beer

eg. {name: "Coors", country: "USA", price: 8.50} -> "Coors"

The solution is in  lab2-3c.ts

## Part 3 - Scanning

Start with the following data which is in file lab3-2d.ts

```typescript
import { of } from 'rxjs';
import { scan } from 'rxjs/operators';

// random integers
const base$ = of(9,4,9,-3,-2,10,3);

// check to see that the unfiltered stream looks like
base$.subscribe(x => console.log(x));

```
   
Use can to perform the following operations

1. Compute the sum
2. Compute the sum of the squares
3. Compute the product of all the numbers
4. Find the largest number
5. Find the smallest number

The solution is in file lab3-2e.ts

Now repeat the exercise but replace `scan` with `reduce` and compare the results.

The solution is in file lab3-2f.ts

---

## Part 4 - Mapping

This part of the lab just requires you to run some code and make sure that you understand what is happening

Run the mergeMap, switchMap,exhaustMap and concatMap examples from the demo files

Notice the output and the rate at which the output appears. 

Can you explain the differences.

Hint: This is how they differ

- concatMap: Finish each task in order, one at a time
  
- mergeMap: Start each task as soon as it comes in, handle multiple tasks at once.

- exhaustMap: Focus on the first task, ignore new tasks until the current one is done.
  
- switchMap: Always work on the latest task, abandon previous tasks if a new one comes in.

---

## Par 5 - Tapping

Start with the code from the mapping lab3-2a.ts

```typescript
import {of} from 'rxjs';
import {map} from 'rxjs/operators'

// random integers between -5 and 10
const base$ = of(9,4,9,-3,-2,10,3,6,-2,5,5,1,7,3,5,3,-4,9,2,3)
.pipe(map( x => x <0  ? -x : x),map(x => x * x * x));

// check to see that the unfiltered stream looks like
base$.subscribe(x => console.log(x));

```

Insert the tap operator to output values before each map operation and after the second

use something like; 

```typescript
tap(val => console.log(`Before first map: ${val}`))
```

A solution is in lab3-2g.ts


---

## End
