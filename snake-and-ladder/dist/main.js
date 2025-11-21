import { colorType } from "./player.js";
import Player from "./player.js";
import Obstacle from "./obstacle.js";
class Game {
    allColors = [
        colorType.BLUE,
        colorType.GREEN,
        colorType.RED,
        colorType.YELLOW,
    ];
    allObstacles = [];
    playerArr = [];
    assignPlayer(colorType) {
        let player = new Player();
        if (!this.allColors.includes(colorType)) {
            return console.log("Color Not Available");
        }
        player.chooseColor(colorType);
        this.allColors.splice(this.allColors.indexOf(colorType), 1);
        console.log("Color Selected");
        this.playerArr.push(player);
        return player;
    }
    createObstacle() {
        const obstacles = [
            // Snakes
            new Obstacle("SNAKE", 99, 54),
            new Obstacle("SNAKE", 95, 72),
            new Obstacle("SNAKE", 80, 42),
            new Obstacle("SNAKE", 47, 26),
            new Obstacle("SNAKE", 36, 6),
            // Ladders
            new Obstacle("LADDER", 2, 38),
            new Obstacle("LADDER", 7, 29),
            new Obstacle("LADDER", 22, 58),
            new Obstacle("LADDER", 28, 84),
            new Obstacle("LADDER", 41, 79),
        ];
        this.allObstacles = obstacles;
    }
    handleDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
    takeTurn(player) {
        const diceRoll = this.handleDice();
        console.log(diceRoll);
        if (player.pos + diceRoll === 100) {
            console.log(`${player.color} Won`);
            return;
        }
        else if (player.pos + diceRoll > 100) {
            console.log(`${player.color} Roll Again`);
            return;
        }
        const obstacle = this.checkForObstacle(player.pos + diceRoll);
        if (obstacle) {
            if (obstacle.type === "LADDER") {
                player.pos = obstacle.end;
                console.log("Ladder Moved to Positon", player.pos);
                return;
            }
            else if (obstacle.type === "SNAKE") {
                player.pos = obstacle.end;
                console.log("Snake Bite Moved to Positon", player.pos);
            }
        }
        player.pos = player.pos + diceRoll;
        console.log(`${player.color} Moved to Positon`, player.pos);
    }
    checkForObstacle(pos) {
        return this.allObstacles.find(obstacle => obstacle.start === pos);
    }
    getAllPlayers() {
        return this.playerArr;
    }
}
function wait(ms) {
    return new Promise(res => setTimeout(res, ms));
}
async function play(game, p1, p2) {
    for (let i = 0; i < 100; i++) {
        game.takeTurn(p1);
        game.takeTurn(p2);
        await wait(2000); // this actually pauses
    }
}
const game = new Game();
game.createObstacle();
const playerA = game.assignPlayer(colorType.BLUE);
const playerB = game.assignPlayer(colorType.GREEN);
play(game, playerA, playerB);
//# sourceMappingURL=main.js.map