// naive-vending-machine.ts

enum MachineState {
    IDLE = "IDLE",
    ITEM_SELECTED = "ITEM_SELECTED",
    HAS_MONEY = "HAS_MONEY",
    DISPENSING = "DISPENSING",
  }
  
  export class NaiveVendingMachine {
    private currentState: MachineState = MachineState.IDLE;
    private selectedItem: string | null = null;
    private insertedAmount: number = 0;
  
    selectItem(itemCode: string): void {
      switch (this.currentState) {
        case MachineState.IDLE:
          console.log(`Item selected: ${itemCode}`);
          this.selectedItem = itemCode;
          this.currentState = MachineState.ITEM_SELECTED;
          break;
  
        case MachineState.ITEM_SELECTED:
        case MachineState.HAS_MONEY:
          console.log("Item already selected.");
          break;
  
        case MachineState.DISPENSING:
          console.log("Cannot change selection while dispensing.");
          break;
      }
    }
  
    insertCoin(amount: number): void {
      switch (this.currentState) {
        case MachineState.IDLE:
          console.log("Select an item first.");
          break;
  
        case MachineState.ITEM_SELECTED:
          console.log(`Inserted ₹${amount}`);
          this.insertedAmount = amount;
          this.currentState = MachineState.HAS_MONEY;
          break;
  
        case MachineState.HAS_MONEY:
          console.log("Money already inserted.");
          break;
  
        case MachineState.DISPENSING:
          console.log("Cannot insert coin while dispensing.");
          break;
      }
    }
  
    dispenseItem(): void {
      switch (this.currentState) {
        case MachineState.IDLE:
          console.log("Nothing to dispense.");
          break;
  
        case MachineState.ITEM_SELECTED:
          console.log("Insert money first.");
          break;
  
        case MachineState.HAS_MONEY:
          console.log("Dispensing item...");
          this.currentState = MachineState.DISPENSING;
  
          // simulate dispensing
          console.log(`Item dispensed: ${this.selectedItem}`);
          this.reset();
          break;
  
        case MachineState.DISPENSING:
          console.log("Already dispensing.");
          break;
      }
    }
  
    private reset() {
      this.currentState = MachineState.IDLE;
      this.selectedItem = null;
      this.insertedAmount = 0;
    }
  }
  