## Adapter Pattern refresher

The Adapter pattern helps when you need to plug a *new* system into an *old* contract without changing either side. The adapter sits between the legacy API and the modern library, translating calls so both systems can work together.

## Legacy payment contract

`PaymentProcessor` (see `adapter-pattern/legacy.ts`) is the interface that the existing checkout flow understands. The legacy implementation prints the amount that was paid, but real code could be much more involved. We **cannot** change this interface because every part of the product already uses it:

```
interface PaymentProcessor {
  pay(amount: number): void;
}
```

## Modern providers

We now want to integrate `StripeAPI` and `PayPalSDK` from `adapter-pattern/new-lib.ts`. Their methods (`makeCharge` and `processPayment`) do not match the legacy `pay` signature, so we cannot drop them into the existing checkout logic directly.

## Building adapters

In `adapter-pattern/adapter.ts` we wrap each modern provider with a class that implements `PaymentProcessor`:

```
class StripeAdapter implements PaymentProcessor {
  constructor(private stripe: StripeAPI) {}

  pay(amount: number) {
    this.stripe.makeCharge(amount);
  }
}
```

`PayPalAdapter` follows the same idea. Each adapter exposes the legacy method names while delegating to the provider-specific methods internally.

## Using the adapters

`main.ts` shows how the checkout flow stays untouched—it still only knows about `PaymentProcessor`. We can pass:

```
checkout(new LegacyPaymentProcessor());
checkout(new StripeAdapter(new StripeAPI()));
checkout(new PayPalAdapter(new PayPalSDK()));
```

Each call results in the correct provider handling the payment, proving that the adapter layer successfully bridges the mismatch in interfaces.