// vending-states.ts

import { VendingMachine } from "./machine";



export interface MachineState {
  selectItem(context: VendingMachine, itemCode: string): void;
  insertCoin(context: VendingMachine, amount: number): void;
  dispenseItem(context: VendingMachine): void;
}

// ------------------- IdleState -------------------

export class IdleState implements MachineState {
  selectItem(context: VendingMachine, itemCode: string): void {
    console.log(`Item selected: ${itemCode}`);
    context.setSelectedItem(itemCode);
    context.setState(new ItemSelectedState());
  }

  insertCoin(): void {
    console.log("Select an item first.");
  }

  dispenseItem(): void {
    console.log("No item selected.");
  }
}

// ------------------- ItemSelectedState -------------------

export class ItemSelectedState implements MachineState {
  selectItem(): void {
    console.log("Item already selected.");
  }

  insertCoin(context: VendingMachine, amount: number): void {
    console.log(`Inserted ₹${amount}`);
    context.setInsertedAmount(amount);
    context.setState(new HasMoneyState());
  }

  dispenseItem(): void {
    console.log("Insert money before dispensing.");
  }
}

// ------------------- HasMoneyState -------------------

export class HasMoneyState implements MachineState {
  selectItem(): void {
    console.log("Cannot change selection after inserting money.");
  }

  insertCoin(): void {
    console.log("Money already inserted.");
  }

  dispenseItem(context: VendingMachine): void {
    console.log("Dispensing item...");
    context.setState(new DispensingState());
    context.dispense();
  }
}

// ------------------- DispensingState -------------------

export class DispensingState implements MachineState {
  selectItem(): void {
    console.log("Currently dispensing. Wait.");
  }

  insertCoin(): void {
    console.log("Cannot insert coin during dispensing.");
  }

  dispenseItem(): void {
    console.log("Already dispensing...");
  }
}
