Design a task scheduler where users can create tasks that run at a scheduled time.Each task executes a function/operation and the scheduler triggers it.

Lets try to design entities
Task  , User, 

Task - (id , desc,userId, timeScheduled , status )
user - {name}
A scheduler class which helps to execute functions on certain intervals