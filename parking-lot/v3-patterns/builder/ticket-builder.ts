import { Ticket } from "./ticket";
export enum VehicleType {
  MOTORCYCLE = "MOTORCYCLE",
  CAR = "CAR",
  BUS = "BUS",
}

class TicketBuilder {
  private floorId!: number;
  private slotId!: number;
  private vehicleId!: string;
  private vehicleType!: VehicleType;

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
    return new Ticket(this.floorId, this.slotId, this.vehicleId, this.vehicleType);
  }
}
