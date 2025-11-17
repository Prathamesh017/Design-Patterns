import { Enemy } from "./prototype";

/**
 * Keeps reusable enemy blueprints so the main game can clone them quickly.
 */
export class EnemyRegistry {
    private prototypes: Map<string, Enemy> = new Map();

    register(key: string, prototype: Enemy): void {
        this.prototypes.set(key, prototype);
    }

    get(key: string): Enemy {
        const prototype = this.prototypes.get(key);
        if (prototype !== undefined) {
            return prototype.clone();
        }
        throw new Error(`No prototype registered for: ${key}`);
    }
}