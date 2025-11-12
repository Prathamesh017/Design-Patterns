import { Location } from "./location.js";
class Driver {
    name;
    age;
    rating;
    vechile;
    isAvailable = false;
    currentAddress = null;
    drivers = [];
    constructor(name, age, vechile) {
        this.name = name;
        this.age = age;
        this.rating = 5.0;
        this.vechile = vechile;
    }
    markAvailble() {
        this.isAvailable = true;
        this.currentAddress = new Location().set('A', 17.5, 12.4);
    }
    acceptRequest() {
        return Math.random() > 0.5 ? true : false;
    }
    addDriver() {
        this.drivers.push(this);
    }
}
export default Driver;
//# sourceMappingURL=driver.js.map