interface PricingStrategy {
  calculate(basePrice: number, durationHours: number): number;
}
class DefaultPricingStrategy implements PricingStrategy {
  calculate(basePrice:number, duration:number) {
    if (duration < 1) return basePrice;
    if (duration < 2) return basePrice * 1.1;
    if (duration < 4) return basePrice * 1.2;
    return basePrice * 1.3;
  }
}

class WeekendPricingStrategy implements PricingStrategy {
  calculate(basePrice:number, duration:number) {
    return basePrice * 1.5; // flat 50 % weekend surge
  }
}

class MembershipPricingStrategy implements PricingStrategy {
  constructor(private membershipLevel: "SILVER" | "GOLD") {}
  calculate(basePrice:number, duration:number) {
    const discount = this.membershipLevel === "GOLD" ? 0.2 : 0.1;
    return basePrice * (1 - discount);
  }
}
