## Prototype Pattern – Gaming Example

Prototype is a creational design pattern that focuses on cloning fully-initialized objects. Instead of constructing every instance from scratch, we copy an existing “blueprint” object and tweak whatever needs to change.

### When to Reach for Prototype
- Creating fresh objects is expensive, time-consuming, or relies on complex setup.
- You want to avoid duplicating long initialization logic across callers.
- You frequently spawn many similar objects that differ in just a few fields.

### Pain Points Without Prototype
Cloning sounds easy until you ask who is responsible for copying the data.
- How do you copy every field—including private ones—without exposing internals?
- What if the original object contains other objects? Who decides whether to copy those, and how?
- Letting the caller decide what class to instantiate ruins polymorphism, leaks encapsulation, and couples call sites to specific implementations.

```ts
cloneShape(shape: Shape) {
   return new Circle(shape.radius);
}
```
If `shape` actually holds a `Square`, the cloning logic above fails. Moving the responsibility back into the object keeps the clone process polymorphic.

### Gaming Example
Imagine a game with several enemy archetypes:
- `BasicEnemy`: low health, slow, perfect for early levels.
- `ArmoredEnemy`: high health, medium speed, tougher later on.
- `FlyingEnemy`: medium health, fast, harder to hit.

Without prototype, spawning two flying enemies looks like this:
```ts
const flying1 = new Enemy("Flying", 100, 10.5, false, "Laser");
const flying2 = new Enemy("Flying", 100, 10.5, false, "Laser");
```
Now multiply that by every enemy variation and every spawn wave—lots of noisy, error-prone duplication.

### Our Implementation
1. `Enemy` implements the `EnemyPrototype` interface and exposes a `clone()` method that returns a fully detached copy with all private state preserved.
2. `EnemyRegistry` stores prototype instances (e.g., `"flying"`, `"armored"`) and hands out clones on demand, so the game loop never replays the construction logic.

This keeps all cloning knowledge inside the prototype itself, protects constructors from the outside world, and makes spawning new enemies as cheap as grabbing a clone and tweaking a stat or two.
