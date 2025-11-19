/**
 * A small demonstration of the Flyweight pattern using trees in a forest.
 * Run with:  ts-node forrest/trees.ts  (or compile with tsc).
 */

class TreeWithoutFlyweight {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly name: string,
    public readonly texture: string,
    public readonly color: string
  ) {}
}

interface TreeType {
  readonly name: string;
  readonly texture: string;
  readonly color: string;
}

class TreeWithFlyweight {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: TreeType
  ) {}
}

class TreeTypeFactory {
  private static cache = new Map<string, TreeType>();

  static getTreeType(name: string, texture: string, color: string): TreeType {
    const key = `${name}-${texture}-${color}`;

    if (!this.cache.has(key)) {
      this.cache.set(key, Object.freeze({ name, texture, color }));
    }

    return this.cache.get(key)!;
  }

  static get cacheSize(): number {
    return this.cache.size;
  }
}

function plantForestWithoutFlyweight(count: number): TreeWithoutFlyweight[] {
  const trees: TreeWithoutFlyweight[] = [];

  for (let i = 0; i < count; i++) {
    trees.push(
      new TreeWithoutFlyweight(
        Math.random() * 1000,
        Math.random() * 1000,
        "Oak",
        "oak-texture.png",
        "green"
      )
    );
  }
  return trees;
}

function plantForestWithFlyweight(count: number): TreeWithFlyweight[] {
  const trees: TreeWithFlyweight[] = [];

  for (let i = 0; i < count; i++) {
    const type = TreeTypeFactory.getTreeType("Oak", "oak-texture.png", "green");
    trees.push(new TreeWithFlyweight(Math.random() * 1000, Math.random() * 1000, type));
  }
  return trees;
}

// function formatSize(bytes: number): string {
//   const units = ["B", "KB", "MB", "GB"];
//   let size = bytes;
//   let unitIndex = 0;

//   while (size >= 1024 && unitIndex < units.length - 1) {
//     size /= 1024;
//     unitIndex++;
//   }

//   return `${size.toFixed(2)} ${units[unitIndex]}`;
// }

// function estimateMemoryUsageWithout(count: number): number {
//   // Rough estimate: 5 string references + 2 numbers per tree.
//   // Assume 8 bytes per number, 40 bytes per string reference.
//   const bytesPerTree = 2 * 8 + 3 * 40;
//   return bytesPerTree * count;
// }

// function estimateMemoryUsageWith(count: number): number {
//   // Only x & y per tree plus a single reference for the cached type.
//   const bytesPerTree = 2 * 8 + 8;
//   // One shared TreeType object (~3 string references).
//   const sharedBytes = 3 * 40;
//   return bytesPerTree * count + sharedBytes;
// }

function main(): void {
  const treeCount = 100_000;
  plantForestWithoutFlyweight(treeCount);
  plantForestWithFlyweight(treeCount);

  console.log("=== Forest Simulation ===");
  console.log(`Trees planted: ${treeCount.toLocaleString()}`);
  console.log(`TreeType instances (flyweight cache): ${TreeTypeFactory.cacheSize}`);
//   console.log(
//     `Estimated memory without flyweight: ${formatSize(estimateMemoryUsageWithout(treeCount))}`
//   );
//   console.log(
//     `Estimated memory with flyweight:    ${formatSize(estimateMemoryUsageWith(treeCount))}`
//   );
}

main();


