import { Slot, SlotType } from "./parkingslot";
import { Ticket } from "./ticketClass";
import { Vehicle, VehicleType } from "./vechile";

class ParkingLot{
    slots: Slot[];
    static ticketCounter: number = 0;

    constructor(slots: Slot[]) {
        this.slots = slots;
    }

    //continuing step 2 by adding parkVehicle method

    parkVechileMethod(vehicle: Vehicle){
        // Step 3 check if parking lot has free slots for the vehicle type

        const slotAvailable = this.checkAvailability(vehicle.type);
        if(!slotAvailable){
            console.log(`No available slots for vehicle type: ${vehicle.getInfo()}`);
            return null;
        }
        // Step 4 Assign the vehicle to the slot
        slotAvailable.assignVehicle(vehicle.id);

        //Step 5 Generate a ticket for the parked vehicle
         const ticketId = `T-${++ParkingLot.ticketCounter}`;
  const newTicket = new Ticket(ticketId, vehicle.id, [slotAvailable.id ]);

   console.log(`✅ Vehicle ${vehicle.id} parked in slot(s): ${[slotAvailable.id].join(", ")}`);

    }
    private checkAvailability(vehicleType: VehicleType): Slot | null {
        switch (vehicleType) {
            case VehicleType.MOTORCYCLE:
                return this.slots.find(slot => slot.type === SlotType.MOTORCYCLE && slot.isAvailable()) || null;
            case VehicleType.CAR:
                return this.slots.find(slot => slot.type === SlotType.COMPACT && slot.isAvailable()) || null;
            case VehicleType.BUS:
                return this.slots.find(slot => slot.type === SlotType.LARGE && slot.isAvailable()) || null;
            default:
                return null;
        }
    }

}

//Step 1 : Create Slots for parking lot and all are initially free
const slots = [
  new Slot(1, SlotType.MOTORCYCLE,),
  new Slot(2, SlotType.COMPACT),
  new Slot(3, SlotType.LARGE),
  new Slot(4, SlotType.LARGE),
  new Slot(5, SlotType.LARGE),
  new Slot(6, SlotType.LARGE),
  new Slot(7, SlotType.LARGE),
];

const parkingLot = new ParkingLot(slots);

console.log("Parking Lot initialized with slots:", parkingLot.slots);


//Step 2 . Vechile Arrives  and wants to park 

const v1 = new Vehicle("V1", VehicleType.CAR) 

parkingLot.parkVechileMethod(v1)
