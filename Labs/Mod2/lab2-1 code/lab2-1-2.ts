// Lab 2.1.2 Creating observables

import { Observable, of, from, concat,merge} from "rxjs";

const ob1$ = of ("Goodbye","Cruel","World");
  
const ob2$ = from(["Goodbye","Cruel","World"]);


//ob1$.subscribe(x => console.log(x))
//ob1$.subscribe(x => console.log(x))
    
//const ob3$ = merge(ob1$,ob2$);
//const ob3$ = concat(ob1$,ob2$);
//ob3$.subscribe(x => console.log(x))