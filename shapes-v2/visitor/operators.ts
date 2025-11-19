// OPERATION 1: Area Calculation

import { Circle2, Rectangle2, ShapeVisitor } from "./shape";

class AreaVisitor implements ShapeVisitor {
    totalArea = 0;
  
    visitCircle(circle: Circle2): void {
      this.totalArea += Math.PI * circle.radius * circle.radius;
    }
  
    visitRectangle(rect: Rectangle2): void {
      this.totalArea += rect.width * rect.height;
    }
  }
  
  // OPERATION 2: JSON Export

class JsonExportVisitor implements ShapeVisitor {
    result: any;
  
    visitCircle(circle: Circle2): void {
      this.result = {
        type: "circle",
        radius: circle.radius
      };
    }
  
    visitRectangle(rect: Rectangle2): void {
      this.result = {
        type: "rectangle",
        width: rect.width,
        height: rect.height
      };
    }
  }
  

  export {JsonExportVisitor,AreaVisitor}