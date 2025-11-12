import Customer from "./code/customer.js";
import Driver, { VehicleType } from "./code/driver.js";
import { Location } from "./code/location.js";
import Ride from "./code/ride.js";


class Main{
     drivers: Driver[] = [];
    handleBooking(customer:Customer,ride:Ride){
        //get all  options with price 
        if(customer && customer.pickup && customer.drop){
        const allOptions=ride.showDifferentFarePrice(customer.pickup,customer.drop);
        // select a option
        const selectedOption=this.chooseAnyOption(allOptions);
        
        const driver=ride.sendRequestDrivers(this.drivers,customer.pickup,customer.drop,selectedOption);
        console.log(driver);
        if(!driver){
            return console.log('NO Driver Accepted Your Request');
        }
        console.log('Driver Pickuped')



        // make a booking
        }
        else{
            console.log('PICK UP OR DROP MISSING');
        }
        // make a booking

    }
    initializeDrivers(count: number): Driver[] {
    const vehicleTypes: VehicleType[] = ["BIKE", "CAB", "AUTO"];
    

     for (let i = 1; i <= count; i++) {
    const name = `Driver_${i}`;
    const age = 20 + Math.floor(Math.random() * 15); // random age 20–35
    const vehicle = this.getRandom(vehicleTypes);
    const driver = new Driver(name, age, vehicle);

    // mark as available and give random location
    const latitude = 12 + Math.random() * 10; // random range for demo
    const longitude = 70 + Math.random() * 10;
    driver.isAvailable = true;
    driver.currentAddress = new Location().set(`Loc_${i}`, latitude, longitude);
    this.drivers.push(driver);
    driver.addDriver();
  }

  return this.drivers;
}
    chooseAnyOption(options:{BIKE:number,CAB:number,AUTO:number}){
        const keys = Object.keys(options) as VehicleType[];
  const randomIndex = Math.floor(Math.random() * keys.length);

  return keys[randomIndex];
    }
     getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

}


const customer=new Customer('Customer1',12);
const main=new Main();
main.initializeDrivers(10);
const ride= new Ride(20,8)
customer.setPickup({name:'a',lat:5.4,long:7.9},{name:'b',lat:4.5,long:3.3});
main.handleBooking(customer,ride);

