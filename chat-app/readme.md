Mediator Pattern

It promotes loose coupling by preventing objects from referring to each other directly, and lets you vary their interactions independently.

In Simple Words , if there are multiple components who need to talk to one another , we add another layer whose main work is commuicate effiecently .so that no everything is exposed in way


It’s particularly useful in situations where:

You have a group of tightly coupled classes or UI components that need to communicate.
Changes in one component require updates in multiple others.
You want to centralize communication logic to simplify maintenance and testing.

Naive Approach (users talk directly to each other)

```
// naive.ts

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sendMessage(message: string, receiver: User) {
    receiver.receiveMessage(message, this);
  }

  receiveMessage(message: string, sender: User) {
    console.log(`${this.name} got message from ${sender.name}: ${message}`);
  }
}

// Usage
const alice = new User("Alice");
const bob = new User("Bob");

alice.sendMessage("Hello Bob!", bob);

```

What’s wrong here?

Alice must know Bob directly.
If you add 10 users, each one must know the others.
The network becomes a mess.


Mediator Pattern (users talk only to mediator)
```
// mediator.ts

// Mediator Interface
interface ChatMediator {
  send(message: string, sender: User): void;
}

// Concrete Mediator
class ChatRoomMediator implements ChatMediator {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  send(message: string, sender: User) {
    for (const user of this.users) {
      if (user !== sender) {
        user.receive(message, sender);
      }
    }
  }
}

// Colleague class
class User {
  name: string;
  private mediator: ChatMediator;

  constructor(name: string, mediator: ChatMediator) {
    this.name = name;
    this.mediator = mediator;
  }

  send(message: string) {
    this.mediator.send(message, this);
  }

  receive(message: string, sender: User) {
    console.log(`${this.name} received from ${sender.name}: ${message}`);
  }
}

// Usage
const chatRoom = new ChatRoomMediator();

const alice = new User("Alice", chatRoom);
const bob = new User("Bob", chatRoom);
const charlie = new User("Charlie", chatRoom);

chatRoom.addUser(alice);
chatRoom.addUser(bob);
chatRoom.addUser(charlie);

// Now users never talk directly
alice.send("Hi everyone!");
bob.send("Hello Alice!");

```