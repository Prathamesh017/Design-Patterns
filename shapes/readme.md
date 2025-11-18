Bridge Pattern(took some time to understand)

Imagine you have 2 shapes , and we can render them 2 ways , so how to approach this ,
A Naive way will be 
Create 4 classes - CircleRender1,CircleRender2,ReactangleRender1,RectangleRender2
check naive.ts

so this will expload , if i add another shape , total classes =6 ,if i add another render method , it will be 3 shapes*3 Render=9 Classes

This will grow grow multiplicatively (shapes × renderers) ,so to solve this we use bridge pattern

With Bridge , we make a relation i.e is `every has shape has renderer method`
here shape is a `abstraction` and render is a `implementor`

so first we will declare a implemetor interface , which will have all the shaped based render method which each new render has to implement

```
interface Renderer {
   renderCircle(radius: number): void;
   renderRectangle(width: number, height: number): void;
}
```
A Example would be
```
class VectorRenderer implements Renderer {
   renderCircle(radius: number): void {
       console.log("Drawing a circle of radius " + radius + " using VECTOR rendering.");
   }

   renderRectangle(width: number, height: number): void {
       console.log("Drawing a rectangle " + width + "x" + height + " using VECTOR rendering.");
   }
}
```
so if a add a new shape , we can simple add a render triangle method here for vectorRenderer class

similarly we define the abstraction interface which each shape has to have
```
abstract class Shape {
   protected renderer: Renderer;

   constructor(renderer: Renderer) {
       this.renderer = renderer;
   }

   public abstract draw(): void;
}
```

A Example would be 
```
class Circle extends Shape {
   private readonly radius: number;

   constructor(renderer: Renderer, radius: number) {
       super(renderer);
       this.radius = radius;
   }

   draw(): void {
       this.renderer.renderCircle(this.radius);
   }
}
```
this way , if there is a new render method created , Circle doesn't have to know about it or have to create another class , as we were doing earlier , it just need to pass , it as constructor parameter 

this way we have stopped grow multiplicatively (shapes × renderers) class creation. also the benefit , we can decide the renderer at runtime by passing the values 