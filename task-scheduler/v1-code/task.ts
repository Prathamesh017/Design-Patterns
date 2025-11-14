export type TaskStatus='INITALIZED'|'COMPLETED'|'FAIL'
interface Task{
    id:string;
    desc:string;
    userId:string;
    time:Date;
    status:TaskStatus
}
class Task{
    static counter=1;
    static tasklist:Task[]=[];

    id!: string
    desc!: string
    userId!: string
    time!: Date
    status!: TaskStatus
    
    set(desc:string,
    userId:string,
    time:Date,
    status:TaskStatus){
        this.id=`Task-${Task.counter++}`
        this.desc=desc;
        this.userId=userId;
        this.status=status;
        this.time=time
        Task.tasklist.push(this)
        return this;
    }
    update(status:TaskStatus){
        this.status=status;
        console.log(`Task ${this.id} has been  ${status}`)
    }
    getTaskList(){
        return  Task.tasklist
    }
}

export default Task;