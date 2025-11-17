import Editor from "./editor";
import Memento from "./memento";

/**
 * Caretaker - Manages undo/redo stacks but does NOT inspect what's inside mementos.
 * 
 * The Caretaker does not know what the editor contains. It only knows how to store snapshots.
 * 
 * The Caretaker handles:
 * - pushing states onto a history stack
 * - popping states for undo
 * - optionally managing redo
 * - setting limits: e.g., "keep only last 100 mementos"
 * - deciding when to save (e.g., after each user action)
 */
class Caretaker {
    private undoStack: Memento[] = [];
    private redoStack: Memento[] = [];
    private maxHistorySize: number;

    constructor(maxHistorySize: number = 100) {
        this.maxHistorySize = maxHistorySize;
    }

    /**
     * Save the current state of the editor
     * This should be called after each user action
     */
    saveState(editor: Editor): void {
        const memento = editor.createMemento();
        this.undoStack.push(memento);
        
        // Clear redo stack when a new action is performed
        this.redoStack = [];
        
        // Limit history size
        if (this.undoStack.length > this.maxHistorySize) {
            this.undoStack.shift(); // Remove oldest state
        }
    }

    /**
     * Undo the last action
     */
    undo(editor: Editor): boolean {
        if (this.undoStack.length === 0) {
            return false; // Nothing to undo
        }

        // Save current state to redo stack
        const currentMemento = editor.createMemento();
        this.redoStack.push(currentMemento);

        // Restore previous state
        const previousMemento = this.undoStack.pop()!;
        editor.restore(previousMemento);

        return true;
    }

    /**
     * Redo the last undone action
     */
    redo(editor: Editor): boolean {
        if (this.redoStack.length === 0) {
            return false; // Nothing to redo
        }

        // Save current state to undo stack
        const currentMemento = editor.createMemento();
        this.undoStack.push(currentMemento);

        // Restore next state
        const nextMemento = this.redoStack.pop()!;
        editor.restore(nextMemento);

        return true;
    }

    /**
     * Check if undo is possible
     */
    canUndo(): boolean {
        return this.undoStack.length > 0;
    }

    /**
     * Check if redo is possible
     */
    canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    /**
     * Clear all history
     */
    clearHistory(): void {
        this.undoStack = [];
        this.redoStack = [];
    }
}

export default Caretaker;

