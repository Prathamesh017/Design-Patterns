"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    static counter = 1;
    static tasklist = [];
    id;
    desc;
    userId;
    time;
    status;
    set(desc, userId, time, status) {
        this.id = `Task-${Task.counter++}`;
        this.desc = desc;
        this.userId = userId;
        this.status = status;
        this.time = time;
        Task.tasklist.push(this);
        return this;
    }
    update(status) {
        this.status = status;
        console.log(`Task ${this.id} has been  ${status}`);
    }
    getTaskList() {
        return Task.tasklist;
    }
}
exports.default = Task;
//# sourceMappingURL=task.js.map