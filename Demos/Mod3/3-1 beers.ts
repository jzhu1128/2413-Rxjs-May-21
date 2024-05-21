// demo from "Yakov Fain"

import { Observable, from  } from "rxjs";
import {filter, map} from "rxjs/operators"

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50},
    {name: "Brooklyn Lager", country: "USA", price: 8.00},
    {name: "Sapporo", country: "Japan", price: 7.50}
];

const beer$ =from(beers).pipe(
    filter(beer => beer.price < 8),
    map(beer => beer.name + ": $" + beer.price)
)

beer$.subscribe({
    next: (x) => console.log(x),
    error: (err) => console.log(err),
    complete: () => console.log("Done"),
});