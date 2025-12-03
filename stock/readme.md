STOCK EXCHANGE

#### Trader
A Trader can place a order to buy  or sell a stock , they also maintain thier `portfolio` which contains current price and  quantity
A Order will have
stockSymbol → e.g., "AAPL"
orderType → BUY or SELL
price → limit price (max for buy, min for sell)
quantity → number of shares
trader → who placed the order
timestamp → when it was placed (important for tie-breaking)


#### Order
---
the important thing is know is we can't just place a order , a order to actually work it  needs to have a similar buy/sell order in the order book
Order 1 (Buy): Trader A wants 100 shares of AAPL at $150.
Order 2 (Sell): Trader B wants to sell 100 shares of AAPL at $145.
Match → Trade executes for 100 shares at $145 (or $150 depending on exchange rules).
Trader A gets 100 shares, Trader B gets $14,500.

we must choose from the most valid order , for example , there won't be a sell sometime directly for 100 orders sometime ,sometimes it can be 40 order or 50 sell , the most approaite should be selected  and also
Example: Buyer wants 100 shares, Seller offers 40 shares.
Trade executes for 40 shares, Buyer still has 60 shares pending in the order book.

Another Scenerio will be 
Buy Order: Trader A wants to buy 100 shares of AAPL at $150.
Sell Orders:
Trader B wants to sell 50 shares of AAPL at $145.
Trader C wants to sell 50 shares of AAPL at $146.


Exchange checks the order book:

Highest buy bid = $150 (Trader A).
Lowest  sell ask = $145 (Trader B).

✅ Match possible because $150 ≥ $145.
First trade executes:
Trader A buys 50 shares from Trader B at $145.
Trader A’s buy order now has 50 shares remaining.
Trader B’s sell order is fully filled and removed from the book.
Exchange continues matching:
Trader A still wants 50 shares at $150.
Next lowest sell ask = $146 (Trader C).

✅ Match again because $150 ≥ $146.
Second trade executes:
Trader A buys 50 shares from Trader C at $146.
Trader A’s buy order is now fully filled.
Trader C’s sell order is fully filled and removed.
---

Order can be 2 types `LIMIT` or `MARKET`
Market Order → “I want to buy/sell immediately at the best available price.”
Price is not specified; the exchange matches it with the best opposite order.

Limit Order → “I want to buy/sell only if the price meets my condition.”
Price is specified; the order waits in the order book until a match happens.


---

#### Multiple Stock
The exchange must support trading in more than one stock (AAPL, TSLA, MSFT, etc.).
So instead of one big order book, you maintain one order book per stock symbol.
Each order book is basically two lists/queues:
Buy orders (sorted by highest price first).
Sell orders (sorted by lowest price first).