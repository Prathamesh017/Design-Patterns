Step 1 
The First Step would be to understand all the identify all the concreate classes/objects

| Entity           | Description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| **Vehicle**      | Something that comes in and takes space — has type (Car, Bike, Bus) |
| **Parking Slot** | The physical space where a vehicle is parked                        |
| **Ticket**       | Proof of parking — links vehicle to slot(s), includes entry time    |
| **Parking Lot**  | The manager — holds all slots, handles park/unpark operations       |



---

Step 2
Next step would be to identify the relationship between them

So A Vechile is assoicated with ticket and parking slot as one to one relationship and vice-versa as well , right so the question also arises 

`Should Vechile Know its' parking slot id or does ticket know the parking slot id , how much information should be shared among them right`

This brings us to understand `how much coupling and data sharing to introduce between entities — and when.`

**General rule of thumb**
>> Start with minimal coupling, add more links only when use cases demand them.
Here’s why:

Too much cross-linking (everyone knowing about everyone) makes your model harder to change.
(e.g. You change Ticket → you must update Slot → you must update Vehicle.)
Too little linking can make your operations inefficient or awkward to express.
So, begin lean → expand connections when they solve a concrete need.



So for now we can 

```
“Vehicle can just have id and type.
Slot and Ticket will each have vehicleId.
Slot might not need ticketId, but Ticket should be associated with Slot.
We’ll handle ParkingLot manager later.”
```

---

Step 3

Define what each class is responsible for (its main job).

1) Vechile will just intialize itself (id type (Motorcycle, Car, Bus)) with constructor 
2) once A Vechile is created , we will check for available slot right , A Slot will  Represent a single parking space and track its state.
Properties
id
type (MotorcycleSlot / CompactSlot / LargeSlot)
isOccupied
vehicleId? (which vehicle is currently here)
3) once a slot is available ,we will issue a ticket , Ticket will have 
id
vehicleId
slotIds[]
entryTime
exitTime?

so now , “Once a Vehicle is created, we check for available Slot(s). If available, we issue a Ticket.”


Define all these 3 classes

---
Step 4 

Define a parking main manager  , it is the main controller of every one , so first step is define all functionalites/responsibilties it can do

so next is we will try to implement the basic functionalities first
1) park vechile 
2) unpark vechile


so for parking a vechile , we will think what already should be available , like slots should be available before hand right so that   , we can allocate them one by one once a vechile comes right , ticket is issue later ,

so first step is allocating or creating slots , then assigning a vechile to a slot and then assining it a ticket 

