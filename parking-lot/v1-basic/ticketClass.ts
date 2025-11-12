// ticket.ts
export class Ticket {
  id: string;
  vehicleId: string;
  slotIds: number[];
  entryTime: Date;
  exitTime?: Date;

  constructor(id: string, vehicleId: string, slotIds: number[]) {
    this.id = id;
    this.vehicleId = vehicleId;
    this.slotIds = slotIds;
    this.entryTime = new Date();
  }

  
}
