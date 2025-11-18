import { StripeAdapter,PayPalAdapter } from "./adapter-pattern/adapter";
import LegacyPaymentProcessor, { PaymentProcessor } from "./adapter-pattern/legacy";
import { PayPalSDK, StripeAPI } from "./adapter-pattern/new-lib";

function checkout(processor: PaymentProcessor) {
    processor.pay(499);
  }

//existing legacy implementation
const legacy=new LegacyPaymentProcessor()
checkout(legacy);

const stripe=new StripeAPI()
const stripeAdapter=new StripeAdapter(stripe)
checkout(stripeAdapter);

const paypal=new PayPalSDK()
const paypalAdapter=new PayPalAdapter(paypal)
checkout(paypalAdapter);
