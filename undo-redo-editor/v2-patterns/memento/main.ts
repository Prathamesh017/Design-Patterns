import Editor from "./editor";
import Caretaker from "./caretaker";

/**
 * Example demonstrating the Memento Pattern
 * 
 * This shows how the three components work together:
 * 1. Memento - stores state snapshots
 * 2. Editor (Originator) - creates and restores mementos
 * 3. Caretaker - manages undo/redo history
 */
function demonstrateMementoPattern() {
    console.log("=== Memento Pattern Demo ===\n");

    // Create editor and caretaker
    const editor = new Editor("");
    const caretaker = new Caretaker();

    // Initial state
    console.log("Initial state:", editor.getContent());

    // Write some text
    console.log("\n--- Writing 'Hello' ---");
    editor.write("Hello");
    caretaker.saveState(editor);
    console.log("Content:", editor.getContent());

    // Write more text
    console.log("\n--- Writing ' World' ---");
    editor.write(" World");
    caretaker.saveState(editor);
    console.log("Content:", editor.getContent());

    // Write even more
    console.log("\n--- Writing '!' ---");
    editor.write("!");
    caretaker.saveState(editor);
    console.log("Content:", editor.getContent());

    // Undo once
    console.log("\n--- Undo ---");
    caretaker.undo(editor);
    console.log("Content:", editor.getContent());

    // Undo again
    console.log("\n--- Undo again ---");
    caretaker.undo(editor);
    console.log("Content:", editor.getContent());

    // Redo
    console.log("\n--- Redo ---");
    caretaker.redo(editor);
    console.log("Content:", editor.getContent());

    // Write new text (this clears redo stack)
    console.log("\n--- Writing ' Universe' (clears redo) ---");
    editor.write(" Universe");
    caretaker.saveState(editor);
    console.log("Content:", editor.getContent());

    // Try to redo (should fail - redo stack was cleared)
    console.log("\n--- Trying to redo (should fail) ---");
    const canRedo = caretaker.redo(editor);
    console.log("Can redo:", canRedo);
    console.log("Content:", editor.getContent());
}

// Run the demo
demonstrateMementoPattern();

