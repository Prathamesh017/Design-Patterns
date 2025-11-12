import Driver, { VehicleType } from "./driver.js";
import { location} from "./location.js";
class Ride{
    private baseFare: number;
    private perKmRate: number;
    constructor(baseFare:number,perKmRate: number) {
    this.baseFare=baseFare;
    this.perKmRate=perKmRate;
  }

  showDifferentFarePrice(current:location,destination:location){
    const fare=this.calculateFare(current,destination);
    const bike=fare+this.vechileTypeFare("BIKE");
    const cab=fare+this.vechileTypeFare("CAB");
    const auto=fare+this.vechileTypeFare("AUTO");
    return {"BIKE":bike,"CAB":cab,"AUTO":auto}
  }
  sendRequestDrivers(drivers:Driver[],current:location,destination:location,vechile:VehicleType){
    const allDrivers= this.getAllNearDrivers(drivers,current,destination,vechile);
    for(const driver of allDrivers){
         let accepted=driver.acceptRequest();
         if(accepted===true){
            return driver;
            
         }
    }
    return null;
}

  getAllNearDrivers(drivers:Driver[],current:location,destination:location,vechile:VehicleType,count=5){
    const available = drivers.filter(d => d.isAvailable && d.vechile===vechile);
const sorted = available.sort((a, b) => {

    const da = this.calculateDistance(current, a.currentAddress!);
    const db = this.calculateDistance(current, b.currentAddress!);
    return da - db;
  });
  return sorted.slice(0, count);
  }


    
    private calculateFare(current:location,destination:location){
        const distance=this.calculateDistance(current,destination);
        return this.baseFare + (this.perKmRate * distance)
    }
    private vechileTypeFare(vechile:VehicleType){
        let val=0;
        switch(vechile){
            case "AUTO":
            val=50;
            break;
            case "BIKE":
            val=20;
            break;
            case "CAB":
            val=50;
            break;
            default:
            val=0;
            break;

        }
        return val;
        
    }
    
    private calculateDistance(current:location,destination:location){
    const dx = current.lat   - destination.lat;
    const dy = current.long- destination.long;
    return Math.sqrt(dx * dx + dy * dy); 
    }


}
export default Ride;