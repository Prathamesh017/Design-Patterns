import Margherita, { Pizza } from "./decorator/base-class";
import { ExtraCheese, Olives, Jalapenos } from "./decorator/decorator";

let pizza: Pizza = new Margherita();

//this is the base margherita pizza with specific toppings
let pizza2 = new ExtraCheese(pizza);
let pizza3 = new Olives(pizza);
let pizza4 = new Jalapenos(pizza);


//this will have combo of all the pizzas
let allCombined=new Jalapenos(new Olives( new ExtraCheese( new Margherita)));

console.log(pizza.getDescription());
console.log(pizza.getCost());
