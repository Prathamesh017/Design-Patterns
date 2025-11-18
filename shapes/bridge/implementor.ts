export interface Renderer {
    renderCircle(radius: number): void;
    renderRectangle(width: number, height: number): void;
 }

 class VectorRenderer implements Renderer {
    renderCircle(radius: number): void {
        console.log("Drawing a circle of radius " + radius + " using VECTOR rendering.");
    }
 
    renderRectangle(width: number, height: number): void {
        console.log("Drawing a rectangle " + width + "x" + height + " using VECTOR rendering.");
    }
    //if there is another Triganle Shape added , can simply add in interface and add approaite method
 }

 class RasterRenderer implements Renderer {
    renderCircle(radius: number): void {
        console.log("Drawing pixels for a circle of radius " + radius + " (RASTER).");
    }
 
    renderRectangle(width: number, height: number): void {
        console.log("Drawing pixels for a rectangle " + width + "x" + height + " (RASTER).");
    }
 }

 export {VectorRenderer,RasterRenderer}