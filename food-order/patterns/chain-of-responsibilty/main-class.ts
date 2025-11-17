import BaseHandler, { RequestHandler } from "./base-class";

interface Order {
    items: string[];
    totalPrice: number;
    tags: string[];
  }

class GlutenFreeHandler extends BaseHandler {
     next: RequestHandler | null = null;
    setNext(next: RequestHandler): void {
        this.next = next;
    }
    handle(order: Order): void {
        if (order.items.some(item => item.toLowerCase().includes("gluten-free"))) {
            order.tags.push("GLUTEN_FREE");
        }
        this.next?.handle(order);
    }
}

class ExtraSpicyHandler extends BaseHandler {
     next: RequestHandler | null = null;
    setNext(next: RequestHandler): void {
        this.next = next;
    }
    handle(order: Order): void {
        if (order.items.some(item => item.toLowerCase().includes("extra spicy"))) {
            order.tags.push("SPICY");
        }
    }
}

class KidsMealHandler extends BaseHandler {
     next: RequestHandler | null = null;
    setNext(next: RequestHandler): void {
        this.next = next;
    }
    handle(order: Order): void {
        if (order.items.some(item => item.toLowerCase().includes("kids meal"))) {
            order.tags.push("KIDS_MEAL");
        }
    }
}
class PremiumHandler extends BaseHandler {
     next: RequestHandler | null = null;
    setNext(next: RequestHandler): void {
        this.next = next;
    }
    handle(order: Order): void {
        if (order.totalPrice > 2000) {
            order.tags.push("PREMIUM");
        }
    }
}
class NormalHandler extends BaseHandler {
     next: RequestHandler | null = null;
    setNext(next: RequestHandler): void {
        this.next = next;
    }
    handle(order: Order): void {
        if (order.tags.length === 0) {
            order.tags.push("NORMAL");
        }
    }
}



export {NormalHandler,PremiumHandler,KidsMealHandler,ExtraSpicyHandler,GlutenFreeHandler};