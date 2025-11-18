import { Pizza } from "./base-class";

export class PizzaDecorator implements Pizza {
    constructor(protected pizza: Pizza) {}
  
    getDescription() {
      return this.pizza.getDescription();
    }
  
    getCost() {
      return this.pizza.getCost();
    }
}
  