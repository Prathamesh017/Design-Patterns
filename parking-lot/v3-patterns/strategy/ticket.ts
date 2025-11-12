class Ticket {
  constructor(
    public price: number,
    public duration: number,
    private strategy: PricingStrategy
  ) {}

  handleTicketOnExit() {
    this.price = this.strategy.calculate(this.price, this.duration);
  }
}
