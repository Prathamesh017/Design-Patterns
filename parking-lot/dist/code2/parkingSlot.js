export class Slot {
    id;
    type;
    floorId;
    isOccupied = false;
    vehicleId;
    constructor(id, type, floorId) {
        this.id = id;
        this.type = type;
        this.floorId = floorId;
    }
    markOccupy(vehicleId) {
        this.isOccupied = true;
        this.vehicleId = vehicleId;
    }
    markFree(vechileId) {
        this.isOccupied = false;
        this.vehicleId = undefined;
    }
}
export default Slot;
//# sourceMappingURL=parkingSlot.js.map