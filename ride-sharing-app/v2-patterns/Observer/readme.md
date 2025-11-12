The Observer Pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are automatically notified.

The core idea is whenver there is a relation between 2 entites where one  entitiy  function call all it's relative entity objects should be triggered


so Consider Rider as a parent , and all driver as childern or observables , so parent will keep a reference of all the child object i.e drivers

So whenever the parent’s internal state changes, it just loops through those references and calls a known method (commonly update() or similar) on each observer. That’s how notification propagates.