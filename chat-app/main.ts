import { ChatMediator,User,ChatRoomMediator } from "./meditator/meditoror";
const chatRoom = new ChatRoomMediator();

const alice = new User("Alice", chatRoom);
const bob = new User("Bob", chatRoom);
const charlie = new User("Charlie", chatRoom);

chatRoom.addUser(alice);
chatRoom.addUser(bob);
chatRoom.addUser(charlie);

// broadcast
alice.send("Hello everyone!");

// private message
alice.sendTo("Bob, meet me after class.", "Bob");
charlie.sendTo("Alice, here is the file.", "Alice");
