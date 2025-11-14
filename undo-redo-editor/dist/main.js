"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_js_1 = __importDefault(require("./editor.js"));
class Main {
    startEdit(editor) {
        console.log("---- Test 1 ----");
        editor.write("Hi");
        this.getText(editor);
        editor.undo();
        this.getText(editor);
        editor.redo();
        this.getText(editor);
        console.log("---- Test 2 ----");
        editor.write("A");
        this.getText(editor);
        editor.write("B");
        this.getText(editor);
        editor.write("C");
        this.getText(editor);
        editor.undo();
        this.getText(editor);
        editor.undo();
        this.getText(editor);
        editor.undo();
        this.getText(editor);
        // console.log("---- Test 3 ----");
        // editor.write("A");         // "A"
        // this.getText(editor);      // A
        // editor.write("B");         // "AB"
        // this.getText(editor);      // AB
        // editor.undo();             // "A"
        // this.getText(editor);      // A
        // editor.redo();             // "AB"
        // this.getText(editor);      // AB
        // editor.undo();             // "A"
        // this.getText(editor);      // A
        // console.log("---- Test 5 ----");
        // editor.write("Hello");      // "Hello"
        // this.getText(editor);       // Hello
        // editor.write(" World");     // "Hello World"
        // this.getText(editor);       // Hello World
        // editor.undo();              // "Hello"
        // this.getText(editor);       // Hello
        // editor.redo();              // "Hello World"
        // this.getText(editor);       // Hello World
        // console.log("---- Test 6 ----");
        // editor.write("A");          // "A"
        // this.getText(editor);       // A
        // editor.write("B");          // "AB"
        // this.getText(editor);       // AB
        // editor.write("C");          // "ABC"
        // this.getText(editor);       // ABC
        // editor.undo();              // "AB"
        // this.getText(editor);       // AB
        // editor.undo();              // "A"
        // this.getText(editor);       // A
        // editor.write("X");          // "AX"
        // this.getText(editor);       // AX
        // editor.redo();              // nothing
        // this.getText(editor);       // AX
        // console.log("---- Test 7 ----");
        // editor.write("A");          // A
        // this.getText(editor);
        // editor.write("B");          // AB
        // this.getText(editor);
        // editor.write("C");          // ABC
        // this.getText(editor);
        // editor.undo();              // AB
        // this.getText(editor);
        // editor.write("X");          // ABX
        // this.getText(editor);
        // editor.undo();              // AB
        // this.getText(editor);
        // editor.redo();              // ABX
        // this.getText(editor);
        // editor.undo();              // AB
        // this.getText(editor);
        // editor.undo();              // A
        // this.getText(editor);
        // editor.redo();              // AB
        // this.getText(editor);
    }
    getText(editor, text) {
        console.log(editor.currentWord());
    }
}
const main = new Main();
const editor = new editor_js_1.default('');
main.startEdit(editor);
//# sourceMappingURL=main.js.map