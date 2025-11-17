/**
 * Memento - A small object holding a snapshot of the Originator's internal state.
 * 
 * The Memento class stores the state but does NOT expose any methods to modify it.
 * Only the Originator can access the internal state inside the memento.
 */
class Memento {
    constructor(private readonly state: string) {}

    /**
     * Get the stored state
     * This is the only way to access the state, and it's read-only
     */
    getState(): string {
        return this.state;
    }
}

export default Memento;

