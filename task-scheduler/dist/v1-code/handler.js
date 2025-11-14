"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_js_1 = __importDefault(require("./task.js"));
class Handler {
    handleTask() {
        const tasks = task_js_1.default.tasklist;
        let counter = 0;
        const timer = setInterval(() => {
            const tasktoBeHandled = this.checkTime(tasks);
            console.log('RUNNING HANDLER');
            if (tasktoBeHandled) {
                //handle operation
                const result = this.decideResult();
                tasktoBeHandled.update(result);
                counter = 0;
                return;
            }
            counter++;
            console.log(counter);
            console.log('NO TASK TO BE TAKEN');
            if (counter === 3) {
                clearInterval(timer);
            }
        }, 5000);
    }
    checkTime(taskListArr) {
        console.log(taskListArr);
        return taskListArr.find((task) => { return task.time < new Date() && task.status === "INITALIZED"; });
    }
    decideResult() {
        return Math.random() > 0.5 ? "COMPLETED" : "FAIL";
    }
}
exports.default = Handler;
//# sourceMappingURL=handler.js.map