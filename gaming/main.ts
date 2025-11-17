import { Enemy } from "./prototype/prototype";
import { EnemyRegistry } from "./prototype/prototype-registry";

/**
 * Demo entry point that wires everything together.
 */
class Game {
    static main(): void {
        const registry = new EnemyRegistry();

        // Register prototype enemies
        registry.register("flying", new Enemy("FlyingEnemy", 100, 12.0, false, "Laser"));
        registry.register("armored", new Enemy("ArmoredEnemy", 300, 6.0, true, "Cannon"));

        // Clone from registry
        const e1 = registry.get("flying");
        const e2 = registry.get("flying");
        e2.setHealth(80); // maybe this one was spawned with less HP

        const e3 = registry.get("armored");

        // Print stats to verify
        e1.printStats();
        e2.printStats();
        e3.printStats();
    }
}

Game.main();