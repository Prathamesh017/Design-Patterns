// fareStrategy.ts
export interface FareStrategy {
  calculateFare(baseFare: number, perKmRate: number, distance: number): number;
}

// Normal fare
export class NormalFareStrategy implements FareStrategy {
  calculateFare(baseFare: number, perKmRate: number, distance: number): number {
    return baseFare + perKmRate * distance;
  }
}

// Surge fare (e.g., 1.5x)
export class SurgeFareStrategy implements FareStrategy {
  calculateFare(baseFare: number, perKmRate: number, distance: number): number {
    return (baseFare + perKmRate * distance) * 1.5;
  }
}

// Discount fare (e.g., 20% off)
export class DiscountFareStrategy implements FareStrategy {
  calculateFare(baseFare: number, perKmRate: number, distance: number): number {
    const total = baseFare + perKmRate * distance;
    return total * 0.8;
  }
}
