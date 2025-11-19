State Design Pattern
State Pattern can be used when there are multiple states a object can go through and on each state , there can be certain  operations which might or might not happen

Consider A Vending Machine
At any given time, the vending machine can only be in one state, such as:
`IdleState` – Waiting for user input (nothing selected, no money inserted).
`ItemSelectedState` – An item has been selected, waiting for payment.
`HasMoneyState` – Money has been inserted, waiting to dispense the selected item.
`DispensingState` – The machine is actively dispensing the item.

Then Machine can support few operations
selectItem(String itemCode) – Select an item to purchase
insertCoin(double amount) – Insert payment for the selected item
dispenseItem() – Trigger the item dispensing process

but it's beviour depend upon state , if we current state is `idelState` , the behaviour is different in dispenseItem which might happen for `DispensingState` 

so A Naive Approach will be , writing if else in all the functions and writing all the behavouirs based on different state

A Example would be
```
   insertCoin(amount: number): void {
       switch (this.currentState) {
           case State.IDLE:
               console.log("No item selected");
               break;
           case State.ITEM_SELECTED:
               this.insertedAmount = amount;
               console.log("Inserted $" + amount + " for item");
               this.currentState = State.HAS_MONEY;
               break;
           case State.HAS_MONEY:
               console.log("Money already inserted");
               break;
           case State.DISPENSING:
               console.log("Currently dispensing");
               break;
       }
   }
```

Issues with this is
1) Cluttered Code in One Place
2) if there is new state added , i have to change all the existing function and add a new `if else` block
3) Violates the Single Responsibility Principle

Here `State Method` Comes In

With State Method , we first create a interface defining all the functions which vending machine can do
```
interface MachineState {
   selectItem(context: VendingMachine, itemCode: string): void;
   insertCoin(context: VendingMachine, amount: number): void;
   dispenseItem(context: VendingMachine): void;
}
```

next we will create a class for all the states and we will write behaviour of all the functions for that state in the particular itself

this reduces unneccessary `if-else` statements and it is easily extensible if there is new state , we will create a new class with it's implementation of this methods

An Example

class IdleState implements MachineState {
   selectItem(context: VendingMachine, itemCode: string): void {
       console.log("Item selected: " + itemCode);
       context.setSelectedItem(itemCode);
       context.setState(new ItemSelectedState());
   }

   insertCoin(context: VendingMachine, amount: number): void {
       console.log("Please select an item before inserting coins.");
   }

   dispenseItem(context: VendingMachine): void {
       console.log("No item selected. Nothing to dispense.");
   }
}

