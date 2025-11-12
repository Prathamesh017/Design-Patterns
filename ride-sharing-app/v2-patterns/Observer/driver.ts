import { location } from "../../v1-code/location";
import { Observer } from "./ride";

class Driver implements Observer {
  name: string;
  location: string;

  constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }

  getRequestNotification(pickup: location) {
    console.log(`${this.name} received ride request near ${pickup}`);
    const willAccept = Math.random() > 0.7; // randomly decide
    if (willAccept) console.log(`✅ ${this.name} accepted the ride!`);
  }
}

export default Driver;