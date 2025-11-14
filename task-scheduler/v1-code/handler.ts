import Task from "./task.js";



class Handler{
    handleTask(){
        const tasks=Task.tasklist;
           let counter=0;
        const timer=setInterval(()=>{
            const tasktoBeHandled=this.checkTime(tasks);
            console.log('RUNNING HANDLER')
            if(tasktoBeHandled){
                //handle operation
                const result=this.decideResult();
                tasktoBeHandled.update(result)
                counter=0;
                return;
                
            }
            counter++;
            console.log(counter);
            console.log('NO TASK TO BE TAKEN')
            if(counter===3){
                clearInterval(timer);
            }
        },5000)
        
    }
    checkTime(taskListArr:Task[]){
        console.log(taskListArr)
        return taskListArr.find((task)=>{return task.time<new Date() && task.status==="INITALIZED"})
    }
    decideResult(){
        return Math.random() >0.5?"COMPLETED":"FAIL";
    }


}
export default Handler