// vehicle.ts
export var VehicleType;
(function (VehicleType) {
    VehicleType["MOTORCYCLE"] = "MOTORCYCLE";
    VehicleType["CAR"] = "CAR";
    VehicleType["BUS"] = "BUS";
})(VehicleType || (VehicleType = {}));
export class Vehicle {
    id;
    type;
    ticket;
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
    getInfo() {
        return `${this.type} (${this.id})`;
    }
}
//# sourceMappingURL=vehicle.js.map