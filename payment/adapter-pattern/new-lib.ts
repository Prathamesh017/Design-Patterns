class StripeAPI {
    makeCharge(value: number) {
      console.log("Stripe charged:", value);
    }
  }

  class PayPalSDK {
    processPayment(cost: number) {
      console.log("PayPal paid:", cost);
    }
  }
  class RazorpaySDK {
    createPayment(total: number) {
      console.log("Razorpay processed:", total);
    }
  }

  export { StripeAPI, PayPalSDK, RazorpaySDK };