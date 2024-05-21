import { BehaviorSubject } from 'rxjs';

// Define the type for user status
interface UserStatus {
  user: string;
  status: string;
}

// Create a new BehaviorSubject with an initial status
const userStatusSubject = new BehaviorSubject<UserStatus>({ user: 'User1', status: 'Online' });

// Function to simulate a user changing their status
function updateUserStatus(user: string, status: string): void {
  userStatusSubject.next({ user, status });
}

// Subscriber 1
userStatusSubject.subscribe({
  next: (status) => console.log(`Subscriber 1 received: ${status.user} is ${status.status}`)
});

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