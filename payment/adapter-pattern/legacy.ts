export interface PaymentProcessor {
    pay(amount: number): void;
  }

//so legacy system will have this interface extended and implement the methods 
class LegacyPaymentProcessor implements PaymentProcessor {
    pay(amount: number): void {
        console.log(`Paid ₹${amount} using Legacy Payment Processor`);
    }
}

export default LegacyPaymentProcessor;