import { Renderer } from "./implementor";
abstract class Shape {
    protected renderer: Renderer;
 
    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }
 
    public abstract draw(): void;
 }

 export class Circle extends Shape {
    private readonly radius: number;
 
    constructor(renderer: Renderer, radius: number) {
        super(renderer);
        this.radius = radius;
    }
 
    draw(): void {
        this.renderer.renderCircle(this.radius);
    }
 }

 export class Rectangle extends Shape {
    private readonly width: number;
    private readonly height: number;
 
    constructor(renderer: Renderer, width: number, height: number) {
        super(renderer);
        this.width = width;
        this.height = height;
    }
 
    draw(): void {
        this.renderer.renderRectangle(this.width, this.height);
    }
 }

