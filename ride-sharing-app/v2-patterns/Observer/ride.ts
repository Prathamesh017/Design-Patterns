//check refrence of ride in rider.ts v1-code , we were calling sendRequestDrivers() ,
//getitng all the near by drivers and  sending the request for acceptance , 
import {location} from "../../v1-code/location"
export interface Observer {
  getRequestNotification(pickup: location): void;
}
class Ride{
  driverObservers: Observer[] = [];

      subscribe(observer: Observer) {
    this.driverObservers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.driverObservers = this.driverObservers.filter(o => o !== observer);
  }
  notifyAll(pickup: location) {
    console.log(`🚕 New ride request at ${pickup}`);
    this.driverObservers.forEach(observer => observer.getRequestNotification(pickup));
  }

}