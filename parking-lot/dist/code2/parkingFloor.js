import Slot from "./parkingSlot.js";
class ParkingFloor {
    id;
    noOfSlots = 30;
    floorSlots = [];
    constructor(id, noOfSlots, slots) {
        this.id = id;
        this.noOfSlots = noOfSlots;
        this.initalizeSlot(id, slots);
    }
    initalizeSlot(floorId, slots) {
        let slotId = 1;
        for (const [type, count] of Object.entries(slots)) {
            for (let i = 0; i < count; i++) {
                this.floorSlots.push(new Slot(slotId++, type, floorId));
            }
        }
    }
    checkAvailability(type) {
        return this.floorSlots.find((floor) => { return floor.type === type && !floor.isOccupied; });
    }
    markSlotOccupied(floorId, slotId, vechileId) {
        const slot = this.floorSlots.find((floor) => { return floor.floorId === floorId && floor.id === slotId; });
        if (slot) {
            slot.markOccupy(vechileId);
        }
        return slot;
    }
    relaseSlot(floorId, slotId, vechileId) {
        console.log('Releasing Slot iN Progress');
        const slot = this.floorSlots.find((floor) => { return floor.floorId === floorId && floor.id === slotId; });
        console.log(slot);
        if (slot) {
            slot.markFree(vechileId);
        }
        console.log(slot);
        console.log('Releasing Slot Completed');
        return slot;
    }
    getSlots() {
        return this.floorSlots;
    }
}
export default ParkingFloor;
//# sourceMappingURL=parkingFloor.js.map