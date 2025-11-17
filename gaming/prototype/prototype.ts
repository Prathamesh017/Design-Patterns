/// Every enemy should have a clone method so we can duplicate it at runtime.
export interface EnemyPrototype {
    clone(): EnemyPrototype;
}

/**
 * Concrete prototype that represents a single enemy configuration.
 * All fields remain private so cloning does not leak initialization details.
 */
export class Enemy implements EnemyPrototype {
    private type: string;
    private health: number;
    private speed: number;
    private armored: boolean;
    private weapon: string;

    constructor(type: string, health: number, speed: number, armored: boolean, weapon: string) {
        this.type = type;
        this.health = health;
        this.speed = speed;
        this.armored = armored;
        this.weapon = weapon;
    }

    /**
     * Creates a brand-new enemy with the same stats.
     * This keeps construction logic encapsulated in this class.
     */
    clone(): Enemy {
        return new Enemy(this.type, this.health, this.speed, this.armored, this.weapon);
    }

    /**
     * Allows tweaking state after cloning (e.g., damage, buffs).
     */
    setHealth(health: number): void {
        this.health = health;
    }

    /**
     * Helper for demo output.
     */
    printStats(): void {
        console.log(`${this.type} [Health: ${this.health}, Speed: ${this.speed}, Armored: ${this.armored}, Weapon: ${this.weapon}]`);
    }
}