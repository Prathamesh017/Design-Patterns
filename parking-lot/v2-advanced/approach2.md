A bit heavy parking lot 

Step 1 -  Mapping all the models/functions/actors/system-components
All the entities
Parking Lot- which is the main file(name ,address ti distibguish )
Parking Floor - M :1 relation with Parking Lot (will have n parking spots)
Parking Spot - Has different types ( 1) Handicapped, 2) Compact, 3) Large, 4) Motorcycle, and 5) Electric.) , will be mapped to a partifcular floor (id,floor id , type)
Account (id and type - admin,parking attendant )
Ticket (id , price, spot , floor?)
Entrance and Exit Panel (print ticket , facilate fee functions , )
Payment - make payment , type cahs and credit 
ParkignRate - related with Payment , decides rate pe hour 
Parking Attendant- scanning tickets and processing payments. (account related I guess, also related with Entrance ,Exist)
CustomerInfoPortal

Step 2 : Lets try to divide them into Actors , System Components , Data Entities (or Domain Models)

1)Actor - external participants which interact with the system but are not directly part of it, 
people or other systems that your system serves or communicates with.

you can think `Actor` as role or persona that uses your system.

for example
A Customer drives in, collects ticket → actor
A Parking Attendant helps process payments → actor
A System Admin monitors floors or panels → actor


2) System Components  - 
Models which perform some functions like they have they have responsibilities, logic, or behavior.
When reading the problem, ask — “What object performs some action or has logic?


Examples here:
Entry Panel / Exit Panel — interface for ticketing and payments
Info Portal — another interface for payment
Display Board — communicates availability
Electric Panel — for charging and payment
Parking Floor / Parking Lot — they manage spots, capacity, etc.


3)Data Entities (or Domain Models)

These are information holders — they represent the state or data in your system.
They’re not responsible for performing complex logic, but they store, track, and get updated by system components.


Examples here:
Ticket → stores entry time, spot, vehicle, payment status
Vehicle → stores type, license number
Payment → stores amount, method, status
Parking Spot → stores ID, type, occupancy status

How to identify:
When reading, ask — “What object holds information that the system needs to remember or update?”
If it mainly represents state/data, it’s a data entity.



Step 3: Let try to define the flows which will happen in the parking lot
1) Entry Flow , 2) Exit FLow  3) Payment Flow  (for now these 3 are fine)


Step 4 : Decide all the functionalites which will happen in each flow ,
Entry flow — broken into micro-steps
1) entry  - check allocation if space is there are not , decide based on that to allow or not based on vechile type 
