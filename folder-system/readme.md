The Composite Pattern is primarily used when we have a tree‑like structure, like folders containing files (and sub‑folders).

Let's understand the problem first.
Let's write `File` and `Folder` in a naive approach, where we define them separately and handle them with conditionals:

```ts
class File {
   private name: string;
   private size: number;

   getSize(): number {
       return this.size;
   }

   printStructure(indent: string): void {
       console.log(indent + this.name);
   }

   delete(): void {
       console.log("Deleting file: " + this.name);
   }
}

class Folder {
   private name: string;
   private contents: any[] = [];

   getSize(): number {
       let total = 0;
       for (const item of this.contents) {
           if (item instanceof File) {
               total += item.getSize();
           } else if (item instanceof Folder) {
               total += item.getSize();
           }
       }
       return total;
   }

   printStructure(indent: string): void {
       console.log(indent + this.name + "/");
       for (const item of this.contents) {
           if (item instanceof File) {
               item.printStructure(indent + " ");
           } else if (item instanceof Folder) {
               item.printStructure(indent + " ");
           }
       }
   }

   delete(): void {
       for (const item of this.contents) {
           if (item instanceof File) {
               item.delete();
           } else if (item instanceof Folder) {
               item.delete();
           }
       }
       console.log("Deleting folder: " + this.name);
   }
}
```

This might seem fine, but every time we have to check whether a node is a file or a folder and then make the respective call, even though the operations are the same.
Folder is basically “a collection of items (files/folders)”, and there is no common type mapping them together, even though the operations are very similar.

With Composite, we introduce a common interface (like `FileSystemItem`) that both `File` (leaf) and `Folder` (composite) implement.
The `Folder` keeps its children (files or sub‑folders) in an array and simply delegates the operations (`getSize`, `printStructure`, `delete`) to them, keeping the logic clean and uniform.