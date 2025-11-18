export interface Pizza {
    getDescription(): string;
    getCost(): number;
}

//BASE CLASS
class Margherita implements Pizza {
    getDescription() {
      return "Margherita";
    }
    getCost() {
      return 200; // base price
    }
}
  
export default Margherita