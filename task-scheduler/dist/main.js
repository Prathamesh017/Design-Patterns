"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_js_1 = __importDefault(require("./v1-code/handler.js"));
const task_js_1 = __importDefault(require("./v1-code/task.js"));
const user_js_1 = __importDefault(require("./v1-code/user.js"));
class Main {
    handleTask(user, desc, date) {
        const task = new task_js_1.default().set(desc, user.id, date, "INITALIZED");
        console.log(task);
    }
}
const main = new Main();
const user = new user_js_1.default('01', "PT");
const delays = [1, 5, 10]; // seconds
const handler = new handler_js_1.default();
handler.handleTask();
delays.forEach((sec, index) => {
    setTimeout(() => {
        main.handleTask(user, `Task ${index + 1}`, new Date());
    }, sec * 1000);
});
//# sourceMappingURL=main.js.map