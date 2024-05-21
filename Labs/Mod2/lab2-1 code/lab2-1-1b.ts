// Lab 2.1.1 Creating Creating an observable using a provided subscribe method

import { Subscriber , Observable} from "rxjs";

const ob$ = new Observable<string>((sub) => {
    sub.next("Goodbye");
    sub.next("Cruel");
    sub.next("World");
    sub.complete();
});



const s = ob$.subscribe( {
    next: x => console.log(x),
    error: (err) => console.log(err),
    complete: () => console.log("Done"),

});

s.unsubscribe();