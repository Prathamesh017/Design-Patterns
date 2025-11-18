import { FileSystemItem } from "./file";

export class Folder implements FileSystemItem{
private readonly name: string;
   private readonly children: FileSystemItem[] = [];

   constructor(name: string) {
       this.name = name;
   }

   addItem(item: FileSystemItem): void {
       this.children.push(item);
   }
   getSize() {
    let size = 0;
    for (const child of this.children){
         size += child.getSize();
    }
    return size;
}
printStructure(indent: string){
    console.log(indent + "+ " + this.name + "/");
       for (const item of this.children) {
           item.printStructure(indent + "  ");
       }
}
delete(): void {
    for (const item of this.children) {
        item.delete();
    }
    console.log("Deleting folder: " + this.name);
}
}