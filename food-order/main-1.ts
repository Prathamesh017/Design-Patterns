export interface Order {
  items: string[];
  totalPrice: number;
  tags: string[];
}

class OrderProcessor {
  processOrder(order: Order): Order {
    // Reset tags to empty array
    order.tags = [];

    // Check if ANY item contains "gluten-free"
    let hasGlutenFree = false;
    for (let i = 0; i < order.items.length; i++) {
      if (order.items[i].toLowerCase().includes("gluten-free")) {
        hasGlutenFree = true;
        break;
      }
    }
    if (hasGlutenFree) {
      order.tags.push("GLUTEN_FREE");
    }

    // Check if ANY item contains "extra spicy"
    let hasExtraSpicy = false;
    for (let i = 0; i < order.items.length; i++) {
      if (order.items[i].toLowerCase().includes("extra spicy")) {
        hasExtraSpicy = true;
        break;
      }
    }
    if (hasExtraSpicy) {
      order.tags.push("SPICY");
    }

    // Check if ANY item contains "kids meal"
    let hasKidsMeal = false;
    for (let i = 0; i < order.items.length; i++) {
      if (order.items[i].toLowerCase().includes("kids meal")) {
        hasKidsMeal = true;
        break;
      }
    }
    if (hasKidsMeal) {
      order.tags.push("KIDS_MEAL");
    }

    // Check if totalPrice > 2000
    if (order.totalPrice > 2000) {
      order.tags.push("PREMIUM");
    }

    // If NONE of the above matched, add "NORMAL"
    if (order.tags.length === 0) {
      order.tags.push("NORMAL");
    }

    return order;
  }
}

// Example usage
const processor = new OrderProcessor();

const order1: Order = {
  items: ["gluten-free pizza", "coke"],
  totalPrice: 1500,
  tags: []
};

const order2: Order = {
  items: ["extra spicy wings", "fries"],
  totalPrice: 800,
  tags: []
};

const order3: Order = {
  items: ["burger", "fries"],
  totalPrice: 2500,
  tags: []
};

const order4: Order = {
  items: ["kids meal burger", "juice"],
  totalPrice: 500,
  tags: []
};

const order5: Order = {
  items: ["regular pizza", "coke"],
  totalPrice: 1200,
  tags: []
};

console.log("Order 1:", processor.processOrder(order1));
console.log("Order 2:", processor.processOrder(order2));
console.log("Order 3:", processor.processOrder(order3));
console.log("Order 4:", processor.processOrder(order4));
console.log("Order 5:", processor.processOrder(order5));

