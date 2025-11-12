// slot.ts


export enum SlotType {
  MOTORCYCLE = "MOTORCYCLE",
  COMPACT = "COMPACT",
  LARGE = "LARGE",
}


export class Slot {
  id: number;
  type: SlotType;
  isOccupied: boolean = false;
  vehicleId?: string;

  constructor(id: number, type: SlotType) {
    this.id = id;
    this.type = type;
  }

  assignVehicle(vehicleId: string) {
    if (this.isOccupied) throw new Error(`Slot ${this.id} already occupied`);
    this.vehicleId = vehicleId;
    this.isOccupied = true;
  }

  freeSlot() {
    this.vehicleId = undefined;
    this.isOccupied = false;
  }

  isAvailable() {
    return !this.isOccupied;
  }
}
