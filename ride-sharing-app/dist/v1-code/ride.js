class Ride {
    baseFare;
    perKmRate;
    constructor(baseFare, perKmRate) {
        this.baseFare = baseFare;
        this.perKmRate = perKmRate;
    }
    showDifferentFarePrice(current, destination) {
        const fare = this.calculateFare(current, destination);
        const bike = fare + this.vechileTypeFare("BIKE");
        const cab = fare + this.vechileTypeFare("CAB");
        const auto = fare + this.vechileTypeFare("AUTO");
        return { "BIKE": bike, "CAB": cab, "AUTO": auto };
    }
    sendRequestDrivers(drivers, current, destination, vechile) {
        const allDrivers = this.getAllNearDrivers(drivers, current, destination, vechile);
        for (const driver of allDrivers) {
            let accepted = driver.acceptRequest();
            if (accepted === true) {
                return driver;
            }
        }
        return null;
    }
    getAllNearDrivers(drivers, current, destination, vechile, count = 5) {
        const available = drivers.filter(d => d.isAvailable && d.vechile === vechile);
        const sorted = available.sort((a, b) => {
            const da = this.calculateDistance(current, a.currentAddress);
            const db = this.calculateDistance(current, b.currentAddress);
            return da - db;
        });
        return sorted.slice(0, count);
    }
    calculateFare(current, destination) {
        const distance = this.calculateDistance(current, destination);
        return this.baseFare + (this.perKmRate * distance);
    }
    vechileTypeFare(vechile) {
        let val = 0;
        switch (vechile) {
            case "AUTO":
                val = 50;
                break;
            case "BIKE":
                val = 20;
                break;
            case "CAB":
                val = 50;
                break;
            default:
                val = 0;
                break;
        }
        return val;
    }
    calculateDistance(current, destination) {
        const dx = current.lat - destination.lat;
        const dy = current.long - destination.long;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
export default Ride;
//# sourceMappingURL=ride.js.map