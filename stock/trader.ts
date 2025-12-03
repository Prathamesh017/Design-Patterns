import Order from "./order";
import Stock from "./stock";
class Trader{
    name:string
    balance:number;
    orders:Order[]=[];
    constructor(name:string,balance:number){
        this.name=name;
        this.balance=balance;
    }
    updateBalance(balance:number,type:"ADD"|"SUB"){
        if(type==="ADD"){
        this.balance+=balance
        }else{
            this.balance-=balance;
        }
    }
    addPortfolio(order:Order){
         // find existing holding for the same stock symbol
    const existing = this.orders.find(o => o.stock.symbol === order.stock.symbol);

    if (existing) {
        // aggregate quantities
        existing.quantity += order.quantity;

        // optional: update average price if you want to track cost basis
        // existing.price = ((existing.price * existing.quantity) + (order.price * order.quantity)) / (existing.quantity + order.quantity);
    } else {
        // no existing holding, add new
        this.orders.push(order);
    }
    }
    removePortfolio(orderId:number){
        this.orders=this.orders.filter((order)=>{
            return order.id!==orderId
        })

    }
    getPortfolio(symbol:string){
    const totalStocks = this.orders.reduce((acc, order) => {
    if (order.stock.symbol === symbol) {
    return acc + order.quantity;
  }
  return acc;
}, 0);
return totalStocks
    }
}
export default Trader;