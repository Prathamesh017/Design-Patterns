import { Circle, Rectangle } from "./bridge/abstraction";
import { Renderer, VectorRenderer, RasterRenderer } from "./bridge/implementor";

const vector: Renderer = new VectorRenderer();
       const raster: Renderer = new RasterRenderer();

       const circle1: Shape = new Circle(vector, 5);
       const circle2: Shape = new Circle(raster, 5);

       const rectangle1: Shape = new Rectangle(vector, 10, 4);
       const rectangle2: Shape = new Rectangle(raster, 10, 4);

       circle1.draw();     // Vector
       circle2.draw();     // Raster
       rectangle1.draw();  // Vector
       rectangle2.draw();  // Raster