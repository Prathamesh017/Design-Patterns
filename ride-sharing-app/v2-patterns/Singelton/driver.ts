import Driver from "../Observer/driver";

class DriverPool {
  private static instance: DriverPool;
  private drivers: Driver[] = [];

  private constructor() {}

  static getInstance(): DriverPool {
    if (!DriverPool.instance) DriverPool.instance = new DriverPool();
    return DriverPool.instance;
  }

  addDriver(driver: Driver) {
    this.drivers.push(driver);
  }

  getAll() {
    return this.drivers;
  }
}
