TLDR - A Common Wrapper for creating objects at one place , instead of spreading them out in the whole codebase
Factory Method
it decides which specific class to instantiate, so you don’t sprinkle new everywhere in your code. so instead of doing `new` everywhere in our codebase , we create a simple factory method which is responsible for handling object creation



Example
```
class Car { constructor(public number: string) {} }
class Bike { constructor(public number: string) {} }
class Truck { constructor(public number: string) {} }
```

without factory , we can have to it this way
const v1 = new Car("MH12AB1234");
const v2 = new Bike("MH13CD5678");
const v3 = new Truck("MH14EF9999");

Now, imagine this logic spreads across your app — ticketing, entry gate, floors, etc.
If you ever change how vehicles are created (say, trucks need extra metadata), you’ll have to update everywhere.

so instead you create you create a factory class ,which handles object creation logic for you in a single file

```
class VehicleFactory {
  static createVehicle(type: VehicleType, number: string): Vehicle {
    switch (type) {
      case VehicleType.CAR:
        return new Car(number);
      case VehicleType.BIKE:
        return new Bike(number);
      case VehicleType.TRUCK:
        return new Truck(number);
      default:
        throw new Error("Invalid vehicle type");
    }
  }
}
```
so if the car needs some new values in future , we have to just change the factory file , not everywhere the code is being used with `new`

it also makes it simpler to make change , let say , for example- this is inital flow
const car = new Car("MH12AB1234", new Ticket(), new CarFeeStrategy(), SlotType.COMPACT);


but 6 months later , we have to change the slotType from compact to motorcycle or some other thing , that why we have to do the change everywhere , but with factory we are combining object creation at a single place  . it is a like global store ,
```
class VehicleFactory {
  static createVehicle(type: VehicleType, number: string): Vehicle {
    switch (type) {
      case VehicleType.CAR:
        return new Car(number, new Ticket(), new CarFeeStrategy(), SlotType.COMPACT);
      case VehicleType.BIKE:
        return new Bike(number, new Ticket(), new BikeFeeStrategy(), SlotType.MOTORCYCLE);
      case VehicleType.ELECTRIC_CAR:
        return new ElectricCar(number, new Ticket(), new EVFeeStrategy(), SlotType.CHARGING);
      default:
        throw new Error("Invalid vehicle type");
    }
  }
}
```
once you make change here , it will be applied to all exisitng cars without manually changing it everywhere
