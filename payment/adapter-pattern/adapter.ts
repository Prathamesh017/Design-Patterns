import { PaymentProcessor } from "./legacy";
import { PayPalSDK, StripeAPI } from "./new-lib";
class StripeAdapter implements PaymentProcessor{
    stripeAPI:StripeAPI;
    constructor(stripeAPI:StripeAPI){
        this.stripeAPI=stripeAPI;
    }
    pay(amount: number): void {
        this.stripeAPI.makeCharge(amount);
    }
}

class PayPalAdapter implements PaymentProcessor{
    paypalSDK:PayPalSDK;
    constructor(paypalSDK:PayPalSDK){
        this.paypalSDK=paypalSDK;
    }
    pay(amount: number): void {
        this.paypalSDK.processPayment(amount);
    }
}



export  {PayPalAdapter,StripeAdapter};