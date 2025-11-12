export type slots={
    motorcycle:number;
    compact:number;
    large:number;
}

export class Slot{
    id:number;
    type:keyof slots
    floorId:number;
    isOccupied: boolean = false
    vehicleId?: string

    constructor(id:number,type:keyof slots,floorId:number){
        this.id=id;
        this.type=type;
        this.floorId=floorId;
    }
    markOccupy(vehicleId:string){
        this.isOccupied=true;
        this.vehicleId=vehicleId
    }
    markFree(vechileId:string){
        this.isOccupied=false;
        this.vehicleId=undefined;
    }
   

}
export default Slot;