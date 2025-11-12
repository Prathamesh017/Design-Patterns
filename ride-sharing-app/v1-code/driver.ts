import { location, Location } from "./location.js";

export type VehicleType="BIKE"|"CAB"|"AUTO"
class Driver{
    name:string;
    age:number;
    rating:number;
    vechile:VehicleType;
    isAvailable:boolean=false;
    currentAddress:location|null=null;
    drivers:Driver[]=[];
      constructor(name:string,age:number,vechile:VehicleType){
        this.name=name;
        this.age=age;
        this.rating=5.0;
        this.vechile=vechile;
    }
    markAvailble(){
        this.isAvailable=true;
        this.currentAddress=new Location().set('A',17.5,12.4)
    }
    acceptRequest(){
        return Math.random()>0.5?true:false;
    }
    addDriver(){
        this.drivers.push(this);
    }
   

// function to create N drivers
 



    
}

export default Driver;