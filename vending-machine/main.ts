import { VendingMachine } from "./state-design/machine";

const machine = new VendingMachine();

machine.selectItem("A1");
machine.insertCoin(50);
machine.dispenseItem();
