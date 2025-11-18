import { PizzaDecorator } from "./base-decorator";
class ExtraCheese extends PizzaDecorator {
    getDescription() {
      return this.pizza.getDescription() + ", Extra Cheese";
    }
  
    getCost() {
      return this.pizza.getCost() + 40;
    }
  }
  
  class Olives extends PizzaDecorator {
    getDescription() {
      return this.pizza.getDescription() + ", Olives";
    }
  
    getCost() {
      return this.pizza.getCost() + 30;
    }
  }
  
  class Jalapenos extends PizzaDecorator {
    getDescription() {
      return this.pizza.getDescription() + ", Jalapenos";
    }
  
    getCost() {
      return this.pizza.getCost() + 25;
    }
  }
  export {Jalapenos,Olives,ExtraCheese}