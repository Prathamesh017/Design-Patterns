import { Image,HighResolutionImage } from "./original-image-service";
//AS ImageProxy also has same method signature as the original one , client won't know the difference between og and proxy service

export class ImageProxy implements Image {
    private fileName: string;
    private realImage: HighResolutionImage | null = null;
 
    constructor(fileName: string) {
        this.fileName = fileName;
        console.log("ImageProxy: Created for " + fileName + ". Real image not loaded yet.");
    }
 
    getFileName(): string {
        // Can safely return without loading the image
        return this.fileName;
    }
 
    display(): void {
        // Lazy initialization: Load only when display() is called
        if (this.realImage === null) {
            console.log("ImageProxy: display() requested for " + this.fileName + ". Loading high-resolution image...");
            this.realImage = new HighResolutionImage(this.fileName);
        } else {
            console.log("ImageProxy: Using cached high-resolution image for " + this.fileName);
        }
 
        // Delegate the display call to the real image
        this.realImage.display();
    }
 }