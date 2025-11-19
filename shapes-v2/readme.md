Visitor Pattern

>>The Visitor Design Pattern is a behavioral pattern that lets you add new operations to existing object structures without modifying their classes.

At its core, Visitor is all about separating operations from the objects they operate on.(very similar to bridge)

let try to understand by an example , consider there are 2 shapes Circle and Rectangle and each have this methods implemented

interface Shape {
   draw(): void;
   calculateArea(): number;
   exportAsSvg(): string;
   toJson(): string;
}
```
class Circle implements Shape {
   private radius: number;

   constructor(radius: number) {
       this.radius = radius;
   }

   draw(): void {
       console.log("Drawing a circle");
   }

   calculateArea(): number {
       return Math.PI * this.radius * this.radius;
   }

   exportAsSvg(): string {
       return "<circle r=\"" + this.radius + "\" />";
   }

   toJson(): string {
       return "{ \"type\": \"circle\", \"radius\": " + this.radius + " }";
   }
}
```
so if there is a new method , i have to add , seems preety fine , the issue with this is every shape needs to define all the methods even if it is not being used , 
also i want to `calcuateArea` of all , i have to call calculateArea func for all the types

Square.calcuateArea
Rect.calcuateArea
Image.calcuateArea
Video.calcuateArea

So with Visitor Pattern we switch things
You remove those operations from the classes.
Then you create a class at the operation level — a visitor — containing all the type-specific logic for that one operation.

For Example - There will be a calcuateArea Class which will have these methods
visitSquare()
visitRect()

so now if there is new operation , we don't have to modify existing  classes but create a new one with all  shaped based funcs

`We Create ONE new class (a new Visitor)`
And inside that visitor class, you write the operation for each type:


Feels Very Similar to Bridge
-remember 
Bridge  helps when you have a matrix of possibilities: 
Example:
Shapes: Circle, Square
Renderers: SVG, Canvas
Naïve →
CircleSVG, CircleCanvas, SquareSVG, SquareCanvas
(add 1 shape or renderer → explosion)

Visitor helps when:
your object structure is stable (File, Folder, Image)
but you keep adding new operations (scan, size, backup, compress)
 

 The key difference is 
 A Bridge always knows about which operation exists as we are calling it from the same class
```
draw() {
    this.renderer.drawCircle(...)
}
```
The shape decides WHAT to draw. i.e circle , The renderer defines HOW to draw. 
Bridge separates abstraction from implementation, but both sides still know the operation exists (draw).
Bridge always has a known, fixed set of methods:


drawCircle
drawRectangle

The abstraction (Shape) depends on them.

But in terms of Visitor
We remove all the operations from the shape.
Circle and Rectangle  has only:
```accept(visitor)```
Shapes have no render, no export, no calculateArea, no resize, no scan.

The visitor decides:
what operation exists,
how many operations exist,
how they behave per type.
Circle does NOT know:
what visitor methods exist,
what operations are available,
how many operations the system supports.

so with visitor , if there is new function we don't have to change the main class again , as it only has visitor func but with bridge if a new class comes

You must change the abstraction side if a new operation appears.

the Shape abstraction
every concrete Shape (Circle, Rectangle)
every Renderer (CanvasRenderer, SvgRenderer)