// mediator.ts

export interface ChatMediator {
    broadcast(message: string, sender: User): void;
    sendTo(message: string, sender: User, receiverName: string): void;
  }
  
export class ChatRoomMediator implements ChatMediator {
    private users: User[] = [];
  
    addUser(user: User) {
      this.users.push(user);
    }
  
    broadcast(message: string, sender: User) {
      for (const user of this.users) {
        if (user !== sender) {
          user.receive(message, sender);
        }
      }
    }
  
    sendTo(message: string, sender: User, receiverName: string) {
      const receiver = this.users.find(u => u.name === receiverName);
      if (receiver) {
        receiver.receive(message, sender);
      } else {
        console.log(`User "${receiverName}" not found`);
      }
    }
  }
  
export class User {
    name: string;
    private mediator: ChatMediator;
  
    constructor(name: string, mediator: ChatMediator) {
      this.name = name;
      this.mediator = mediator;
    }
  
    // broadcast to everyone
    send(message: string) {
      this.mediator.broadcast(message, this);
    }
  
    // message to a specific person
    sendTo(message: string, receiverName: string) {
      this.mediator.sendTo(message, this, receiverName);
    }
  
    receive(message: string, sender: User) {
      console.log(`${this.name} received from ${sender.name}: ${message}`);
    }
  }
  