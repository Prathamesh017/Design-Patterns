import Stock from "./stock";
import Trader from "./trader";
export type orderType="BUY" |"SELL"
export type orderStatus="INITATED"|"PARTIAL" |"COMPLETED"
class Order{
    static counter=0;
    public  id:number;
    public stock:Stock
    public price:number
    public quantity:number
    public type:orderType
    public trader:Trader 
    public status:orderStatus
    constructor(stock:Stock,price:number,quantity:number,status:orderType,trader:Trader){
        this.id=Order.counter++;
        this.type=status;
        this.price=price;
        this.quantity=quantity;
        this.trader=trader;
        this.stock=stock
        this.status="INITATED"
    }
}

export default Order;