// Lab 2.1.1 Creating Creating an observable using a provided subscribe method

import { Subscriber , Observable} from "rxjs";

function subscribe(sub :Subscriber<string>) {
    sub.next("Goodbye");
    sub.next("Cruel");
    sub.next("World");
    sub.complete();
}

const ob$ = new Observable<string>(subscribe);

const client = {
    next: x => console.log(x),
    error: (err) => console.log(err),
    complete: () => console.log("Done"),

};

const s = ob$.subscribe(client);
s.unsubscribe();