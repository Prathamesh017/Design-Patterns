import { FileSystemItem,File } from "./composite/file";
import { Folder} from "./composite/folder";

      const file1 = new File("readme.txt", 5);
       const file2: FileSystemItem = new File("photo.jpg", 1500);
       const file3: FileSystemItem = new File("data.csv", 300);

       const documents = new Folder("Documents");
       documents.addItem(file1);
       documents.addItem(file3);

       const pictures = new Folder("Pictures");
       pictures.addItem(file2);

       const home = new Folder("Home");
       home.addItem(documents);
       home.addItem(pictures);

       console.log("---- File Structure ----");
       home.printStructure("");

       console.log("\nTotal Size: " + home.getSize() + " KB");

       console.log("\n---- Deleting All ----");
       home.delete();