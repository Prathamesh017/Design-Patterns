import { VehicleType } from "./vehicle.js";
class Ticket {
    id;
    price = 0;
    floorId = null;
    slotId = null;
    vechileId = null;
    startTime = new Date();
    isPaid = false;
    static ticketCounter = 0;
    static ticketIssued = [];
    constructor(floorId, slotId, vechileId, type) {
        let price = this.assignPrice(type, floorId);
        let ticketId = `T-${++Ticket.ticketCounter}`;
        this.id = ticketId;
        this.price = price;
        this.floorId = floorId;
        this.slotId = slotId;
        this.vechileId = vechileId;
        this.startTime = new Date();
        Ticket.ticketIssued.push(this);
    }
    assignPrice(type, floorID) {
        let initalPrice = 0;
        switch (type) {
            case VehicleType.CAR:
                initalPrice = 100;
            case VehicleType.BUS:
                initalPrice = 200;
            case VehicleType.MOTORCYCLE:
                initalPrice = 50;
        }
        return floorID === 0 ? initalPrice : floorID === 1 ? initalPrice * 2 : initalPrice * 3;
    }
    getTickets() {
        return Ticket.ticketIssued;
    }
    payTicket() {
        return this.isPaid = true;
    }
    handleTicketonExit() {
        const diffMs = Date.now() - this.startTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        if (diffHours < 1) {
        }
        else if (diffHours < 2) {
            this.price += this.price * 0.1;
        }
        else if (diffHours < 4) {
            this.price += this.price * 0.2;
        }
        else {
            this.price += this.price * 0.3;
        }
        return this;
    }
}
export default Ticket;
//# sourceMappingURL=ticket.js.map