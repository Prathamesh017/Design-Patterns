export interface Image {
    display(): void;
    getFileName(): string;
 }

export class HighResolutionImage implements Image {
    private fileName: string;
    private imageData: Uint8Array;
 
    constructor(fileName: string) {
        this.fileName = fileName;
        this.loadImageFromDisk(); // Expensive operation!
    }
 
    private loadImageFromDisk(): void {
        console.log("Loading image: " + this.fileName + " from disk (Expensive Operation)...");
        // Simulate disk I/O delay
        const start = Date.now();
        while (Date.now() - start < 2000) {
            // Busy wait for 2 seconds
        }
        this.imageData = new Uint8Array(10 * 1024 * 1024); // Simulate 10MB memory usage
        console.log("Image " + this.fileName + " loaded successfully.");
    }
 
    display(): void {
        console.log("Displaying image: " + this.fileName);
    }
 
    getFileName(): string {
        return this.fileName;
    }
 }