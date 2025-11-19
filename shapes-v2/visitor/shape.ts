// ELEMENTS (Shapes with no operations)
export interface ShapeVisitor {
    visitCircle(circle: Circle2): void;
    visitRectangle(rect: Rectangle2): void;
  }
export interface ShapeElement {
    accept(visitor: ShapeVisitor): void;
}
  
  class Circle2 implements ShapeElement {
    constructor(public radius: number) {}
  
    accept(visitor: ShapeVisitor): void {
      visitor.visitCircle(this);
    }
  }
  
  class Rectangle2 implements ShapeElement {
    constructor(public width: number, public height: number) {}
  
    accept(visitor: ShapeVisitor): void {
      visitor.visitRectangle(this);
    }
  }
  
  export {Circle2,Rectangle2}