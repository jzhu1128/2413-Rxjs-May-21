# Lab 4-1 Chat Subject

In this lab, we create a simplistic chat app that emulates a multi-user chat session with a subject

---

#### Step 1 - Define the chat data

Define what a chat message looks like and import Subject

```typescript
import { Subject } from 'rxjs';

// Define the type for messages
interface ChatMessage {
  user: string;
  message: string;
}
```

#### Step 2 - Create the subject and event source

Create the subject, note the use of the type parameter

Also create an event source, in this case a function that emulates someone sending a chat message.

```typescript

// Create a new Subject
const chatSubject = new Subject<ChatMessage>();

// Function to simulate a user sending a message
function sendMessage(user: string, message: string): void {
  chatSubject.next({ user, message });
}
```

#### Step 3 - Create subscriptions to the subject

```typescript

// Subscriber 1
chatSubject.subscribe({
  next: (msg) => console.log(`Subscriber 1 received: ${msg.user}: ${msg.message}`)
});

// Subscriber 2
chatSubject.subscribe({
  next: (msg) => console.log(`Subscriber 2 received: ${msg.user}: ${msg.message}`)
});

```


#### Step 4 - Run the code
``` typescript
// Simulate users sending messages
sendMessage('User1', 'Hello everyone!');
sendMessage('User2', 'Hi User1!');
sendMessage('User3', 'Good morning!');
```

---

The solution is in the file lab4-1.ts

## End