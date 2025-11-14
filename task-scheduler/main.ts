import Handler from "./v1-code/handler.js";
import Task from "./v1-code/task.js";
import User from "./v1-code/user.js";

class Main{
    handleTask(user:User,desc:string,date:Date){
        const task=new Task().set(desc,user.id,date,"INITALIZED");
        console.log(task);
    }
}
const main=new Main();
const user=new User('01',"PT");
const delays = [1, 5, 10]; // seconds
const handler=new Handler();
handler.handleTask();

delays.forEach((sec,index) => {
  setTimeout(() => {
    main.handleTask(user, `Task ${index+1}`, new Date());
  }, sec * 1000);
});

