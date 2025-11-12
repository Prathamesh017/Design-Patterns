import { location } from "./location.js";

class Customer{
    name:string;
    age:number;
    rating:number;
    pickup?:location;
    drop?:location;
    constructor(name:string,age:number){
        this.name=name;
        this.age=age;
        this.rating=5.0;
    }
    setPickup(pickup:location,drop:location){
        this.pickup=pickup;
        this.drop=drop;
    }

}
export default Customer;