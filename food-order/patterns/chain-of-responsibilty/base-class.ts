import { Order } from "../../main-1";

export interface RequestHandler {
    setNext(next: RequestHandler): void;
    handle(order: Order): void;
 }

 abstract class BaseHandler implements RequestHandler {
    next: RequestHandler | null = null;
 
    setNext(next: RequestHandler): void {
        this.next = next;
    }
 
    handle(order:Order ): void {
        if (this.next !== null) {
            this.next.handle(order);
        }
    }
 }
 export default BaseHandler;