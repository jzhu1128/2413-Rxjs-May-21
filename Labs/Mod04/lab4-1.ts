import { Subject } from 'rxjs';

// Define the type for messages
interface ChatMessage {
  user: string;
  message: string;
}

// Create a new Subject
const chatSubject = new Subject<ChatMessage>();

// Function to simulate a user sending a message
function sendMessage(user: string, message: string): void {
  chatSubject.next({ user, message });
}

// Subscriber 1
chatSubject.subscribe({
  next: (msg) => console.log(`Subscriber 1 received: ${msg.user}: ${msg.message}`)
});

// Subscriber 2
chatSubject.subscribe({
  next: (msg) => console.log(`Subscriber 2 received: ${msg.user}: ${msg.message}`)
});

// Simulate users sending messages
sendMessage('User1', 'Hello everyone!');
sendMessage('User2', 'Hi User1!');
sendMessage('User3', 'Good morning!');
