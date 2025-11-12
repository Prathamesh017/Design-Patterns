import Slot from "./parkingSlot.js";

// export enum SlotType {
//   MOTORCYCLE = "MOTORCYCLE",
//   COMPACT = "COMPACT",
//   LARGE = "LARGE",
type Slots={
    motorcycle:number;
    compact:number;
    large:number;
}
class ParkingFloor{
     id:number;
     noOfSlots:number=30;
     floorSlots:Slot[]=[]
  constructor(id:number,noOfSlots:number,slots:Slots){
        this.id=id;
        this.noOfSlots=noOfSlots;
        this.initalizeSlot(id,slots);
    }

      initalizeSlot(floorId:number,slots:Slots){
       let slotId = 1;
    for (const [type, count] of Object.entries(slots) as [keyof Slots, number][]) {
      for (let i = 0; i < count; i++) {
        this.floorSlots.push(new Slot(slotId++, type, floorId));
      }
    }
      
    }
    checkAvailability(type:keyof Slots){
        return this.floorSlots.find((floor)=>{return floor.type===type  && !floor.isOccupied})
    }
    markSlotOccupied(floorId:number,slotId:number,vechileId:string){
      const slot=this.floorSlots.find((floor)=>{return floor.floorId===floorId && floor.id===slotId})
      if(slot){
      slot.markOccupy(vechileId);
      }
      return slot;
    }
     relaseSlot(floorId:number,slotId:number,vechileId:string){
      console.log('Releasing Slot iN Progress');
      const slot=this.floorSlots.find((floor)=>{return floor.floorId===floorId && floor.id===slotId})
      console.log(slot);
      if(slot){
      slot.markFree(vechileId);
      }
      console.log(slot);
      console.log('Releasing Slot Completed');

      return slot;
     
     }
           
            
        
    
    
     getSlots(){
        return this.floorSlots;
    }
}
export default ParkingFloor;