abstract class Shape {
    public abstract draw(): void;
 }

 //This is naive implementation 2shapes*2render methods

class VectorCircle extends Shape {
    public draw(): void {
        console.log("Drawing Circle as VECTORS");
    }
}
class RasterCircle extends Shape {
    public draw(): void {
        console.log("Drawing Circle as PIXELS");
    }
 }
class VectorRectangle extends Shape {
    public draw(): void {
        console.log("Drawing Rectangle as VECTORS");
    }
 }

 class RasterRectangle extends Shape {
    public draw(): void {
        console.log("Drawing Rectangle as PIXELS");
    }
 }