// vending-machine.ts

import { IdleState, MachineState } from "./state";

  
  export class VendingMachine {
    private state: MachineState;
    private selectedItem: string | null = null;
    private insertedAmount: number = 0;
  
    constructor() {
      this.state = new IdleState();
    }
  
    setState(state: MachineState) {
      this.state = state;
    }
  
    setSelectedItem(item: string) {
      this.selectedItem = item;
    }
  
    setInsertedAmount(amount: number) {
      this.insertedAmount = amount;
    }
  
    selectItem(itemCode: string) {
      this.state.selectItem(this, itemCode);
    }
  
    insertCoin(amount: number) {
      this.state.insertCoin(this, amount);
    }
  
    dispenseItem() {
      this.state.dispenseItem(this);
    }
  
    // internal use during DispensingState
    dispense() {
      console.log(`Item dispensed: ${this.selectedItem}`);
      this.reset();
    }
  
    private reset() {
      this.selectedItem = null;
      this.insertedAmount = 0;
      this.state = new IdleState();
    }
  }
  