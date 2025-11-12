Functional Requirements

A rider can request a ride by providing:
pickup location
destination location
vehicle type (e.g., Bike, Sedan, SUV)

The system should match the rider with a nearby available driver of that type.

A driver can:
register themselves (vehicle type, location, availability)
accept or reject ride requests
Once a ride is accepted:

It transitions through states: Requested → Accepted → In Progress → Completed → Cancelled
The system should track ride details like driver, rider, distance, fare, etc.
The fare should be calculated based on:
distance
vehicle type

base fare + per km rate

Non-Functional Requirements (as hints)

The system should be extensible (e.g., easy to add new vehicle types or fare rules).

Code should be clean, testable, and loosely coupled.

Focus on object-oriented modeling and design patterns, not database schemas or APIs.