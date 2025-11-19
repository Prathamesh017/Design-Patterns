# Forest Flyweight Example

The Flyweight design pattern is a structural pattern that shares heavy, immutable data across many lightweight objects. Instead of duplicating the same state in hundreds of instances, we split the object into:

- **Intrinsic state** – data that never changes (shared).  
- **Extrinsic state** – data that is different per usage (passed in at runtime).

## When to use it

- You plan to create a very large number of similar objects.
- Most of those objects repeat the same heavy data (textures, config blobs, strings, etc.).
- Memory footprint is a concern and you can cleanly separate shared vs. per-instance state.

## Naïve tree rendering

Without Flyweight every tree stores *all* of its data, even if 100,000 trees are identical except for `x` and `y`.

```
class Tree {
  constructor(
    public x: number,
    public y: number,
    public name: string,
    public texture: string,
    public color: string
  ) {}
}

const trees: Tree[] = [];

function plantTree(x: number, y: number, name: string, texture: string, color: string) {
  trees.push(new Tree(x, y, name, texture, color));
}
```

> 100,000 trees × full data = massive memory usage, because `name`, `texture`, and `color` are duplicated in every instance.

## Flyweight-aware tree rendering

With Flyweight we cache the heavy data once and store only a reference inside each tree. Intrinsic state lives inside the `TreeType` flyweight.

```
class TreeTypeFactory {
  private static types = new Map<string, TreeType>();

  static getTreeType(name: string, texture: string, color: string): TreeType {
    const key = `${name}-${texture}-${color}`;

    if (!this.types.has(key)) {
      this.types.set(key, new TreeType(name, texture, color));
    }
    return this.types.get(key)!;
  }
}

const trees: Tree[] = [];

function plantTree(x: number, y: number, name: string, texture: string, color: string) {
  const type = TreeTypeFactory.getTreeType(name, texture, color); // shared
  trees.push(new Tree(x, y, type)); // stores only extrinsic state
}
```

Now a `Tree` looks like:

```
Tree {
  x: number
  y: number
  type: pointer_to_shared_flyweight
}
```

Only the first tree creates the flyweight; the rest reuse that same immutable object. This is especially impactful when textures are large strings or binary blobs (50 KB, 200 KB, 1 MB, …).

> **Important:** Flyweights must be immutable. Mutating a shared instance would affect every object pointing to it.

