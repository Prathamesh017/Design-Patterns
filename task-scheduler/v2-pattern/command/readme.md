Lets try to understand command pattern with example

```
class Light {
   on(): void {
       console.log("Light turned ON");
   }

   off(): void {
       console.log("Light turned OFF");
   }
}

class Thermostat {
   private currentTemperature: number = 20; // default

   setTemperature(temp: number): void {
       console.log("Thermostat set to " + temp + "°C");
       this.currentTemperature = temp;
   }

   getCurrentTemperature(): number {
       return this.currentTemperature;
   }
}
```
we have 2 devices , each having few methods
```
class SmartHomeControllerV1 {
   private readonly light: Light;
   private readonly thermostat: Thermostat;

   constructor(light: Light, thermostat: Thermostat) {
       this.light = light;
       this.thermostat = thermostat;
   }

   turnOnLight(): void {
       this.light.on();
   }

   turnOffLight(): void {
       this.light.off();
   }

   setThermostatTemperature(temperature: number): void {
       this.thermostat.setTemperature(temperature);
   }
}```

this is the main controller , he we can set the devices and it has bunch of methods which internally execute the device's method

using this 
```
class SmartHomeApp {
   static main(): void {
       const light = new Light();
       const thermostat = new Thermostat();
       const controller = new SmartHomeControllerV1(light, thermostat);

       controller.turnOnLight();
       controller.setThermostatTemperature(22);
       controller.turnOffLight();
   }
}
```

but the problem , everytime you have to add a device , we need to create class having devices and it methods(this is regardless we have to do) , the repeation which happens here  is  everytime there is new device , i need to update the controller handling the new devices' methods as well and calling them from the main file 

In such case , the ideal way would be controller shouldn't have any idea whose method it is executing , will get the method obj at runtime in parameters , so it can be dynamic and generic for the new methods as well


SO Here Command Pattern Comes In 
(define)

so simply first we define a interface mentioning two methods which  each class should have 
1) execute
2) undo

interface Command {
   execute(): void;
   undo(): void;
}
so know with with actual devices like light and thermosat , we add a new classes for each method

class LightOnCommand implements Command {
   private readonly light: Light;

   constructor(light: Light) {
       this.light = light;
   }

   execute(): void {
       this.light.on();
   }

   undo(): void {
       this.light.off();
   }
}

class LightOffCommand implements Command {
   private readonly light: Light;

   constructor(light: Light) {
       this.light = light;
   }

   execute(): void {
       this.light.off();
   }

   undo(): void {
       this.light.on();
   }
}

class SetTemperatureCommand implements Command {
   private readonly thermostat: Thermostat;
   private readonly newTemperature: number;
   private previousTemperature: number;

   constructor(thermostat: Thermostat, temperature: number) {
       this.thermostat = thermostat;
       this.newTemperature = temperature;
   }

   execute(): void {
       this.previousTemperature = this.thermostat.getCurrentTemperature();
       this.thermostat.setTemperature(this.newTemperature);
   }

   undo(): void {
       this.thermostat.setTemperature(this.previousTemperature);
   }
}
```

which has implemented the command interface having both execute and undo methods for each function

So Now the question how is this supposed to help
```
class SmartButton {
   private currentCommand: Command | null = null;
   private readonly history: Command[] = [];

   setCommand(command: Command): void {
       this.currentCommand = command;
   }

   press(): void {
       if (this.currentCommand !== null) {
           this.currentCommand.execute();
           this.history.push(this.currentCommand);
       } else {
           console.log("No command assigned.");
       }
   }

   undoLast(): void {
       if (this.history.length > 0) {
           const lastCommand = this.history.pop()!;
           lastCommand.undo();
       } else {
           console.log("Nothing to undo.");
       }
   }
}
```

so know in this controller class , the smartbutton internally has no idea which button or functionality it is calling , it will just a recive a object of command interface , 

so using this
```
class SmartHomeApp {
   static main(): void {
       // Receivers
       const light = new Light();
       const thermostat = new Thermostat();

       // Commands
       const lightOn: Command = new LightOnCommand(light);
       const lightOff: Command = new LightOffCommand(light);
       const setTemp22: Command = new SetTemperatureCommand(thermostat, 22);

       // Invoker
       const button = new SmartButton();

       // Simulate usage
       console.log("→ Pressing Light ON");
       button.setCommand(lightOn);
       button.press();

       console.log("→ Pressing Set Temp to 22°C");
       button.setCommand(setTemp22);
       button.press();

       console.log("→ Pressing Light OFF");
       button.setCommand(lightOff);
       button.press();

       // Undo sequence
       console.log("\n↶ Undo Last Action");
       button.undoLast();  // undo Light OFF

       console.log("↶ Undo Previous Action");
       button.undoLast();  // undo Set Temp

       console.log("↶ Undo Again");
       button.undoLast();  // undo Light ON
   }
}
```

this way the controller and main function are `open for extension , closed for modification` following  O of `Solid` principal 

so whenver the new class/device is introduced with it's method , we can directly just pass it's reference to the controller with the main class making it dynamic and generic at the same time


The task scheduler might not be the best example to understand command pattern, if we wanted to implement it here , we will keep handler clearn lie