import ParkingFloor from "./parkingFloor.js";
import Ticket from "./ticket.js";
import { VehicleType, Vehicle } from "./vehicle.js";

type slots={
    motorcycle:number;
    compact:number;
    large:number;
}
interface floorIntialize{
    floorNumber:number,
    slots:slots
}

class Main{
    private floors:ParkingFloor[]=[]
    // private parkingFloord:string
    // private noOfFloors:number 
    // private noOfSlotsperFloor:number


    // constructor(parkingFloorName:string,parkingFloord:string,noOfFloors:number,noOfSlotsperFloor:number){
    //     this.noOfSlotsperFloor=noOfFloors;
    //     this.parkingFloorName=parkingFloorName;
    //     this.parkingFloord=parkingFloord;
    //     this.noOfFloors=noOfSlotsperFloor
    // }

    //Step 1 - Intialize Floor and Spots 
    intializeFloor(noOfFloor:number,floorArr:floorIntialize[]){
        for(let i=0;i<noOfFloor;i++){
            const floors=new ParkingFloor(i,30,floorArr[i].slots);
            this.floors.push(floors);
        }
    }
    getFloorDetails(id:number){
        const floor=this.floors[id];
        return floor.floorSlots;

    }
    private getVechileTypeSlot(vechileType:VehicleType){
        switch(vechileType){
            case VehicleType.CAR:
                return 'compact'
            case VehicleType.BUS:
                return 'large';
            case VehicleType.MOTORCYCLE:
                return 'motorcycle';
        }
    }

    private handleSlot(vechile:Vehicle){
        const slotType=this.getVechileTypeSlot(vechile.type);
        const floorObj=this.floors[0];
        const slotAvailable=floorObj.checkAvailability(slotType);
        if(!slotAvailable){
            return false;
        }
        console.log('Slot Allocated');
        return floorObj.markSlotOccupied(slotAvailable.floorId,slotAvailable.id,vechile.id);
    }
    private handleTickets(floorId:number,slotId:number,vechileId:string,vechileType:VehicleType){
        const ticket=new Ticket(floorId,slotId,vechileId,vechileType);
        return ticket;
    }
    
    handleEntry(vechile:Vehicle){
        console.log('Handling Vechile Entry');
        const slot=this.handleSlot(vechile)
        if(typeof slot===`boolean` && slot===false){
         console.log('No Free Slot')
         return {slot:null,vechile:null};
        }
        
       if(slot){
        const issuedTicket=this.handleTickets(slot.floorId,slot.id,vechile.id,vechile.type)
        console.log('TIcket Issued');
        vechile.ticket=issuedTicket
       }
       return {slot:slot,vechile:vechile}        

    }
    handleExit(vechile:Vehicle,floorId:number,slotId:number){
        //calculate Ticket price and pay
        console.log('Started Handling Exit')
        console.log(vechile.ticket);
        const ticket=vechile.ticket?.handleTicketonExit()
        ticket?.payTicket();
        console.log('Ticket Paid');
        console.log(vechile.ticket);
        const floorObj=this.floors[0];
        floorObj.relaseSlot(floorId,slotId,vechile.id) 
        console.log('Handling Exit Completed')       

    }
}



const floors=[
  { floorNumber: 1, slots: { compact: 10, large: 10, motorcycle: 5 } },
  { floorNumber: 2, slots: { compact: 15, large: 10, motorcycle: 5 } },
  { floorNumber: 3, slots: { motorcycle: 15, large: 10,compact:5 } }
];
const main=new Main();
main.intializeFloor(floors.length,floors);
const vechile=new  Vehicle("V1",VehicleType.CAR);
const {slot,vechile:updatedVechile}=main.handleEntry(vechile);
if(slot && updatedVechile){
main.handleExit(updatedVechile,slot.floorId,slot.id);
}