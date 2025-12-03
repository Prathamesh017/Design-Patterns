import Stock from "./stock";
import Trader from "./trader";
import Order, { orderType } from "./order";
interface IOrderBooks{
    name:string;
    orders:Order[]
}
class Market{
    private orderBooks:IOrderBooks[]=[]
    placeOrder(trader:Trader,stock:Stock,price:number,quantity:number,type:orderType){
        if(type==="BUY" && trader.balance<quantity*price){
            console.log("INSUFFICENT BALANCE");
            return;
        }
        if(type==="SELL"){
            const totalStocks=trader.getPortfolio(stock.symbol)
            if(totalStocks<quantity){
                console.log("INSUFFICENT STOCK TO SELL")
                return;
            }
        }
        const order= new Order(stock,price,quantity,type,trader);
        this.matchOrders(order)
        //check balance and availabitly if selling 
    }
    matchOrders(order:Order){
    
    let oppositeType: orderType = order.type === "SELL" ? "BUY" : "SELL";
    let orderBook = this.orderBooks.filter((ob) => {
        return ob.name === order.stock.symbol;
    })[0];
    
    if (!orderBook) {
         orderBook = {
        name: order.stock.symbol,
        orders: [order]  // Add the order directly here
    };
    this.orderBooks.push(orderBook);
    console.log("First order for this stock, added to order book");
    return;  
    }
    
    // Get orders of opposite type
    let validOrders = orderBook.orders.filter((o) => {
        return o.type === oppositeType;
    });
    //no valid orders exist
    if(validOrders.length==0){
        console.log("No matching orders found we will store in the orders for now",);
        const existingStockBook = this.orderBooks.find((orderBook) => {
        return orderBook.name === order.stock.symbol;
    });

        if (existingStockBook) {
            // Order book exists, just add the order
            existingStockBook.orders.push(order);
        } else {
            // Order book doesn't exist, create new one
            this.orderBooks.push({
                name: order.stock.symbol,
                orders: [order]
            });
        }
        return;
        }








    
    
    let matchingOrders = validOrders
        .filter((o) => o.quantity >= order.quantity)
        .sort((a, b) => {
            return oppositeType === "SELL" ? a.price - b.price : b.price - a.price;
        });
    if(matchingOrders.length>0){
        return this.exactMatching(order,matchingOrders[0])
    }else{
        //have to PARTIAL scan then
        this.partialScan(validOrders,order.type,order)

    }

    }
    partialScan(validOrders:Order[],type:"BUY"|"SELL",buyerOrder:Order){
        //validOrder have all the opposite type valid orders;
         let matchingOrders = validOrders
        .sort((a, b) => {
            return type === "SELL" ? a.price - b.price : b.price - a.price;
        });
        let currentStock=0;
        let lastStock:Order|null=null;
        let ordersToBeFullfilled=[];
        let totalPrice=0;
        for (let i = 0; i < matchingOrders.length; i++) {
            const currentOrder = matchingOrders[i];
            if((currentOrder.quantity+currentStock)<=buyerOrder.quantity){
                ordersToBeFullfilled.push(currentOrder);
                currentStock+=currentOrder.quantity;
                totalPrice+=(currentOrder.price*currentOrder.quantity)
            }else{
                lastStock=currentOrder;
                totalPrice+=(buyerOrder.quantity-currentStock)*lastStock.price;
                break;
            }
        }

        //handle updation
                if(type==="BUY"){
                    //so here current stock will be seller , so it balance should be incremented and stock reduced accrodingly
                    let rem=buyerOrder.quantity-currentStock;
                    if(lastStock){
                    lastStock.quantity-=rem;
                    lastStock.status="PARTIAL"
                    lastStock.trader.updateBalance(rem*lastStock.price,"ADD");
                    }
                    for(let i=0;i<ordersToBeFullfilled.length;i++){
                        let order=ordersToBeFullfilled[i];
                        order.status="COMPLETED"
                        order.trader.updateBalance(order.quantity*order.price,"ADD");
                        order.quantity=0;
                      

                    }
                    //buyer handled - update portfolio but decrement balance
                    buyerOrder.status="COMPLETED"
                    buyerOrder.trader.updateBalance(totalPrice,"SUB")
                    buyerOrder.trader.addPortfolio(buyerOrder);
                }else {
                    let rem=buyerOrder.quantity-currentStock;
                    if(lastStock){
                    lastStock.quantity-=rem;
                    lastStock.status="PARTIAL"
                    lastStock.trader.updateBalance(rem*lastStock.price,"SUB");
                    lastStock.trader.addPortfolio(lastStock);
                    }
                    for(let i=0;i<ordersToBeFullfilled.length;i++){
                        let order=ordersToBeFullfilled[i];
                        order.status="COMPLETED"
                        order.trader.updateBalance(order.quantity*order.price,"SUB");
                        order.trader.addPortfolio(order);

                    }

                    buyerOrder.status="COMPLETED"
                    buyerOrder.trader.updateBalance(totalPrice,"ADD")
                    // buyerOrder.trader.removePortfolio(buyerOrder.id);


                }


    }
    exactMatching(order:Order,matchedOrder:Order){
        
   
        const tradeQuantity = order.quantity; 
        const tradePrice = matchedOrder.price; 
        if (order.type === "BUY") {
            // BUYER
            order.status = "COMPLETED";
            order.trader.addPortfolio(order); // Buyer gets stock
            order.trader.updateBalance(tradeQuantity * tradePrice, "SUB"); // Buyer pays
            
            // SELLER
            matchedOrder.trader.updateBalance(tradeQuantity * tradePrice, "ADD"); // Seller gets money
            matchedOrder.quantity -= tradeQuantity;
            matchedOrder.status = matchedOrder.quantity === 0 ? "COMPLETED" : "PARTIAL"
            
            if (matchedOrder.status === "COMPLETED") {
                matchedOrder.trader.removePortfolio(matchedOrder.id);
            }
            
        } else {
            // Incoming order is SELL
            // order = SELLER, matchedOrder = BUYER
            
            // SELLER
            order.status = "COMPLETED";
            order.trader.updateBalance(tradeQuantity * tradePrice, "ADD"); // Seller gets money
            
            // BUYER
            matchedOrder.status = "COMPLETED";
            matchedOrder.trader.addPortfolio(matchedOrder); // Buyer gets stock
            matchedOrder.trader.updateBalance(tradeQuantity * tradePrice, "SUB"); // Buyer pays
            matchedOrder.quantity = 0;
            
            if (order.status === "COMPLETED") {
                order.trader.removePortfolio(order.id);
            }
        }
        console.log(`Trade executed: ${tradeQuantity} shares at $${tradePrice}`);
    } 
    
}

const trader=new Trader('PT',1000);
const trader2=new Trader('PTA',500);

const stock1=new Stock("APPLE");
const stock2=new Stock("APPLE2");



export default Market