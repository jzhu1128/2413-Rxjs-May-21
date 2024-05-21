# Lab 4-2 Behavior Subject

In this lab, we create a simplistic user status application where multiple observers can receive the latest user status broadcasted by the BehaviorSubject.

---

#### Step 1 - Define the status and the subject

Define what a status message looks like and import Subject

Create the subject with an initial state

```typescript
import { BehaviorSubject } from 'rxjs';

// Define the type for user status
interface UserStatus {
  user: string;
  status: string;
}

// Create a new BehaviorSubject with an initial status
const userStatusSubject = new BehaviorSubject<UserStatus>({ user: 'User1', status: 'Online' });

```

#### Step 2 - Create pseudo event source

Use a function to emulate a user changing status

```typescript

function updateUserStatus(user: string, status: string): void {
  userStatusSubject.next({ user, status });
}
```

#### Step 3 - Add subscribers and generate events

```typescript

// Simulate User1 changing status after some time
setTimeout(() => updateUserStatus('User1', 'Away'), 1000);

// Simulate User2 changing status after some more time
setTimeout(() => updateUserStatus('User2', 'Offline'), 2000);

// Subscriber 2 (subscribes after some statuses have been emitted)
setTimeout(() => {
  userStatusSubject.subscribe({
    next: (status) => console.log(`Subscriber 2 received: ${status.user} is ${status.status}`)
  });
}, 1500);
```


#### Step 4 - Run the code

```console
// Expected Output:
 Subscriber 1 received: User1 is Online
 Subscriber 1 received: User1 is Away
 Subscriber 2 received: User1 is Away
 Subscriber 1 received: User2 is Offline
 Subscriber 2 received: User2 is Offline
```
---
 
The solution is in the file lab4-2.ts

---




## End