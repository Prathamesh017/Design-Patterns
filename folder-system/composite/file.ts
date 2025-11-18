export interface FileSystemItem {
    getSize(): number;
    printStructure(indent: string): void;
    delete(): void;
 }

 export class File implements FileSystemItem{
    private name :string;
    private size:number;
    constructor(name:string,size:number){
        this.name=name;
        this.size=size;
    }
    getSize() {
        return this.size;
    }
    printStructure(indent: string){
        console.log(indent + "- " + this.name);
    }
    delete(): void {
        console.log("Deleting " + this.name);
    }

 }