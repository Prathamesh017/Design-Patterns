import Memento from "./memento";

/**
 * Editor (Originator) - The object whose state needs saving.
 * 
 * The Editor owns editing and state creation.
 * It handles:
 * - typing, deleting, formatting
 * - modifying internal state
 * - knowing how to take a snapshot (createMemento)
 * - knowing how to restore itself from a snapshot (restore)
 */
class Editor {
    private content: string;

    constructor(initialContent: string = "") {
        this.content = initialContent;
    }

    /**
     * Get the current content
     */
    getContent(): string {
        return this.content;
    }

    /**
     * Write text to the editor
     */
    write(text: string): void {
        this.content += text;
    }

    /**
     * Delete the last N characters
     */
    delete(count: number): void {
        this.content = this.content.slice(0, -count);
    }

    /**
     * Create a memento (snapshot) of the current state
     * Only the Originator can create mementos
     */
    createMemento(): Memento {
        return new Memento(this.content);
    }

    /**
     * Restore the editor's state from a memento
     * Only the Originator can restore from mementos
     */
    restore(memento: Memento): void {
        this.content = memento.getState();
    }
}

export default Editor;

