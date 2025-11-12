import Ticket from "./ticket.js";

// vehicle.ts
export enum VehicleType {
  MOTORCYCLE = "MOTORCYCLE",
  CAR = "CAR",
  BUS = "BUS",
}

export class Vehicle {
  id: string;
  type: VehicleType;
  ticket?:Ticket;

  constructor(id: string, type: VehicleType) {
    this.id = id;
    this.type = type;
  }

  getInfo() {
    return `${this.type} (${this.id})`;
  }
}