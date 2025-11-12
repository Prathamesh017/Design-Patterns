TLDR - create a base interface and make all the types extends it so each type can have it's own implementation
Basic Understanding

When you have multiple ways to perform the same action — 
for example, different ways to calculate ticket price, sort data, or apply discounts —
the Strategy pattern lets you plug in the right “algorithm object” at runtime instead of hardcoding logic or using big if/else trees.

```
class Ticket {
  constructor(private price: number, private duration: number) {}

  calculatePrice(vehicleType: string): number {
    if (vehicleType === "CAR") return this.price + this.price * 0.1;
    if (vehicleType === "BUS") return this.price + this.price * 0.2;
    if (vehicleType === "MOTORCYCLE") return this.price + this.price * 0.05;
    return this.price;
  }
}
```
This works — until requirements pile up:

Add weekend surcharge
Add night discount
Add membership-based rules

Now you’re staring at nested if-else spaghetti 🍝
and any new pricing rule requires changing Ticket.
That breaks the Open–Closed Principle
“Software should be open for extension, but closed for modification.”


so what We define a base class which has all the methods ,interface , and different type will have class 

```
interface PaymentStrategy {
  pay(amount: number): void;
}
```
class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Credit Card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using PayPal`);
  }
}

class UPIPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using UPI`);
  }
}
```

so instead of having one also code in one function's nested if else block we separated into different class's methods so now to use a  a payment method,define a context class

class PaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  pay(amount: number) {
    this.strategy.pay(amount);
  }
}

const payment = new PaymentContext(new CreditCardPayment());
payment.pay(500);

payment.setStrategy(new UPIPayment());
payment.pay(300);
```


Benefits
Open for extension – add new strategies without touching existing code.
Cleaner and flexible – remove bulky if/else or switch logic.
Reusability – strategies can be reused in different contexts.
Runtime selection – switch behavior dynamically.