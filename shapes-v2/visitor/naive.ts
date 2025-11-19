// NAIVE APPROACH
// Every shape contains all operations

interface Shape {
    // draw(): void;
    calculateArea(): number;
    toJson(): string;
  }
  
  class Circle implements Shape {
    constructor(private radius: number) {}
  
    draw(): void {
      console.log("Drawing Circle");
    }
  
    calculateArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  
    toJson(): string {
      return JSON.stringify({
        type: "circle",
        radius: this.radius
      });
    }
  }
  
  class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}
  
    draw(): void {
      console.log("Drawing Rectangle");
    }
  
    calculateArea(): number {
      return this.width * this.height;
    }
  
    toJson(): string {
      return JSON.stringify({
        type: "rectangle",
        width: this.width,
        height: this.height
      });
    }
  }
  
  // USAGE
  const shapes: Shape[] = [
    new Circle(10),
    new Rectangle(5, 8)
  ];
  
  for (const s of shapes) {
    console.log("Area:", s.calculateArea());
    console.log("JSON:", s.toJson());
  }
  