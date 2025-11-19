import { AreaVisitor, JsonExportVisitor } from "./visitor/operators";
import { ShapeElement,Circle2,Rectangle2 } from "./visitor/shape";

// USAGE
const shape: ShapeElement[] = [
    new Circle2(10),
    new Rectangle2(5, 8)
  ];
  
  // Area
  const areaVisitor = new AreaVisitor();
  shape.forEach(s => s.accept(areaVisitor));
  console.log("Total Area:", areaVisitor.totalArea);
  
  // JSON Export (for first shape)
  const jsonVisitor = new JsonExportVisitor();
  shape[0].accept(jsonVisitor);
  console.log("First Shape JSON:", jsonVisitor.result);
  