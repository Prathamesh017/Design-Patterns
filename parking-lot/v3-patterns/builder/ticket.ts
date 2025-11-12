
export enum VehicleType {
  MOTORCYCLE = "MOTORCYCLE",
  CAR = "CAR",
  BUS = "BUS",
}
export class Ticket {
  id: string;
  price: number;
  floorId: number;
  slotId: number;
  vehicleId: string;
  vehicleType: VehicleType;
  startTime: Date = new Date();
  static counter = 0;

  constructor(floorId: number, slotId: number, vehicleId: string, vehicleType: VehicleType) {
    this.id = `T-${++Ticket.counter}`;
    this.floorId = floorId;
    this.slotId = slotId;
    this.vehicleId = vehicleId;
    this.vehicleType = vehicleType;
    this.price = this.calculateBasePrice(vehicleType);
  }

  private calculateBasePrice(type: VehicleType) {
    switch (type) {
      case VehicleType.CAR:
        return 100;
      case VehicleType.BUS:
        return 200;
      case VehicleType.MOTORCYCLE:
        return 50;
      default:
        return 0;
    }
  }
}
