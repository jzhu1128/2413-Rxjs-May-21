import { from  } from 'rxjs';
import {filter, map} from  'rxjs/operators';

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

const beers$ = from(beers)
.pipe(filter(x => x.country == "USA"),map(x => x.name));

beers$.subscribe(x => console.log(x));

