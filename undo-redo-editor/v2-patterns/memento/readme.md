In Simple Terms, Meemento helps in keep track of the state , that way we can undo and redo it also

whenver we see , a program needs a implementing undo/redo, version history, or state rollback features. we need to use memento 

The pattern has 3 things

1) Originator → the object/class whose state needs saving (Editor). i.e the editor needs Saving

so it will obvisiouly create a state and have functions to undo/redo it.

the originator/editor has the state i.e string text and and has some methods
createMemento()
restore(memento)

2) Memento → a small object holding a snapshot of the Originator’s internal state.
class Memento {
    constructor(private readonly state: string) {}
    getState() {
        return this.state;
    }
}
will not have any methods to modify the state, Only the Originator can access the internal state inside the memento.


3) Caretaker → manages undo/redo stacks (but does NOT inspect what’s inside mementos).


So In conculsion , memento is simple class just storing the the text and has getContent Method , it doesn't expose any method to manipulate it directly

orginator and caretake can be one class for this simple example , but as the code grows  we will separate based on 

The Editor/Orginator owns editing and state creation
The editor should handle anything that is directly about its state or behavior.

Editor does:
typing, deleting, formatting
modifying internal state
knowing how to take a snapshot
knowing how to restore itself from a snapshot


The caretaker does not know what the editor contains. It only knows how to store snapshots.


Caretaker does:

pushing states onto a history stack
popping states for undo
optionally managing redo
setting limits: e.g., “keep only last 100 mementos”
deciding when to save (e.g., after each user action)