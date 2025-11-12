TLDR - instead of making an object through constructors , we make set functions for each for better handling

Basic Understanding of Builder Pattern = we keep separte  builder class and the main class

The Builder Class  sole job is to assemble and configure a Ticket object before creating it. It does  not replace your main class  it just helps build one in a cleaner, more flexible way.

so for example
The relationship between them
Ticket → the final product (your actual business object that represents a parking ticket).
TicketBuilder → the construction guide (a fluent interface that sets up parameters before creating the ticket).

so instead of intializing a ticket with the help of constructor directly with ticket class , we use the builder instead as it helps us to handle optional and default parameters in much better way , a simple example is. 

instead of 

```
const ticket = new Ticket(floorId, slotId, vehicleId, vehicleType);
```
here some parameters might be optional , some has a default value , it kinds of get messsy to manage with builder pattern, the ticket creation work is done by the builder itself

A Ticket Builder Class has basic set methods which assign values like this
```
class TicketBuilder{

 setFloor(floorId: number) {
    this.floorId = floorId;
    return this;
  }

  setSlot(slotId: number) {
    this.slotId = slotId;
    return this;
  }

  setVehicle(vehicleId: string, vehicleType: VehicleType) {
    this.vehicleId = vehicleId;
    this.vehicleType = vehicleType;
    return this;
  }

    build() {
    const ticket = new Ticket(
      this.floorId,
      this.slotId,
      this.vehicleId,
      this.vehicleType,
      this.pricingStrategy
    );

    if (this.discount > 0) {
      ticket.applyDiscount(this.discount);
    }

    if (this.startTime) {
      ticket.startTime = this.startTime;
    }

    return ticket;
  }

}

//so know we can directly use a builder class instance to create a ticket object

const ticket = new TicketBuilder()
  .setFloor(slot.floorId)
  .setSlot(slot.id)
  .setVehicle(vehicle.id, vehicle.type)
  .setDiscount(10) // optional
  .setPricingStrategy(new WeekendPricingStrategy()) // optional
  .build();
```


Benefits of using Builder Pattern
The Core Problem: Object Construction Becomes Complex

```
class Ticket {
  constructor(
    public floorId: number,
    public slotId: number,
    public vehicleId: string,
    public vehicleType: VehicleType,
    public startTime: Date,
    public discount?: number,
    public strategy?: PricingStrategy
  ) {}
}
```
intially everything is fine , but with time 
You add optional fields like discount, membershipLevel, pricingStrategy.
Some fields should be defaulted, others required.
Some combinations are invalid (you can’t apply both discount and coupon).
Some need validation before creation (e.g., floorId must exist, slotId must be free).

Suddenly, calling new Ticket() becomes error-prone and ugly:
```
// ❌ Confusing and fragile
const ticket = new Ticket(1, 23, "V1", VehicleType.CAR, new Date(), undefined, new DynamicPricingStrategy());
```

also there is `Telescoping Constructor Problem` , where an object requires many attributes — especially a mix of required and optional — constructors become bloated and unreadable.
```
new Ticket(1, 2, "V1", VehicleType.CAR, new Date());
new Ticket(1, 2, "V1", VehicleType.CAR, new Date(), 10);
new Ticket(1, 2, "V1", VehicleType.CAR, new Date(), 10, new DynamicPricing());

A Builder Makes it More Readable

const ticket = new TicketBuilder()
  .setFloor(1)
  .setSlot(2)
  .setVehicle("V1", VehicleType.CAR)
  .setDiscount(10)
  .setPricingStrategy(new DynamicPricing())
  .build();

It also helps to create multiple ticket objs  with  some same default values but few different options

const defaultBuilder = new TicketBuilder()
  .setFloor(1)
  .setSlot(2)
  .setVehicle("V1", VehicleType.CAR);

const discountTicket = defaultBuilder.setDiscount(10).build();
const busTicket = defaultBuilder.setVehicle("B1", VehicleType.BUS).setDiscount(20).build()

also if want to setup different values , based on different parameters , we have to write all logic in consturctor itself 
like if(val===a){ price=100}else{price=200} , but with builder each logic can be in different functions
```

Another Thing You might Think Is , we just another layer  for Ticket Creation , TicketBuilder also creates ticket only , so what is the benifit anyway

Yes , Both produce a Ticket,
but the responsibility of deciding what to pass, when to validate, and what defaults to use has moved.
The Ticket no longer has to care about messy constructor logic — that’s the Builder’s job.


also In a constructor, optional parameters are technically optional,
but practically a nightmare:

1) You must remember their order.
2) You must know what default they use.
3) You can’t skip one in the middle.

```
// Problem: to set the last argument, you must pass all before it.
const t = new Ticket(1, 2, "V1", VehicleType.CAR, undefined, undefined, 1.5);

const t = new TicketBuilder()
  .setVehicle("V1", VehicleType.CAR)
  .setSurgeMultiplier(1.5)
  .build();
```

One Final Example To explain

Phase 1: You start with a clean Ticket class and a direct constructor call.
```
class Ticket {
  constructor(
    public floorId: number,
    public slotId: number,
    public vehicleId: string,
    public vehicleType: VehicleType,
    public price: number
  ) {}
}

const ticket = new Ticket(1, 2, "V1", VehicleType.CAR, 100);
```
Simple. Works fine. 
Phase 2 : Comes New Requirement 

```
class Ticket {
  constructor(
    public floorId: number,
    public slotId: number,
    public vehicleId: string,
    public vehicleType: VehicleType,
    public price: number,
    public membership?: string,        // new optional
    public surgeMultiplier: number = 1 // new optional
  ) {}
}

so changes are
// membership but no surge
new Ticket(1, 2, "V1", VehicleType.CAR, 100, "GOLD");
// both
new Ticket(1, 2, "V1", VehicleType.CAR, 100, "GOLD", 1.5);
// only surge
new Ticket(1, 2, "V1", VehicleType.CAR, 100, undefined, 1.5);
```

It’s valid JavaScript, but human-hostile:

Order matters.
You can’t skip arguments cleanly.
You have to sprinkle undefined.
Every call site must be updated manually if logic changes.
And if next month someone says “Add coupon codes” —
you’re in constructor hell 🔥

so with ticketBuilder

```
class TicketBuilder {
  private floorId!: number;
  private slotId!: number;
  private vehicleId!: string;
  private vehicleType!: VehicleType;
  private price!: number;

  private membership?: string;
  private surgeMultiplier: number = 1;

  setFloor(id: number) { this.floorId = id; return this; }
  setSlot(id: number) { this.slotId = id; return this; }
  setVehicle(id: string, type: VehicleType) { this.vehicleId = id; this.vehicleType = type; return this; }
  setPrice(price: number) { this.price = price; return this; }

  setMembership(level: string) { this.membership = level; return this; }
  setSurgeMultiplier(multiplier: number) { this.surgeMultiplier = multiplier; return this; }

  build() {
    // validation logic here
    if (!this.floorId || !this.slotId || !this.vehicleId || !this.vehicleType) {
      throw new Error("Missing required fields");
    }

    // compute final price with surge and membership discounts
    let finalPrice = this.price * this.surgeMultiplier;
    if (this.membership === "GOLD") finalPrice *= 0.8; // 20% off
    if (this.membership === "SILVER") finalPrice *= 0.9;

    return new Ticket(
      this.floorId,
      this.slotId,
      this.vehicleId,
      this.vehicleType,
      finalPrice,
      this.membership,
      this.surgeMultiplier
    );
  }
}

so now making changes  is much more simpler now 

old code 

const ticket = new TicketBuilder()
  .setFloor(1)
  .setSlot(2)
  .setVehicle("V1", VehicleType.CAR)
  .setPrice(100)
  .build();

no much chnage and easy to accomadate

New code can simply opt-in:

const goldTicket = new TicketBuilder()
  .setFloor(1)
  .setSlot(2)
  .setVehicle("V2", VehicleType.CAR)
  .setPrice(100)
  .setMembership("GOLD")
  .setSurgeMultiplier(1.5)
  .build();


```