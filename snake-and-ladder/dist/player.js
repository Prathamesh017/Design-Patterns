export var colorType;
(function (colorType) {
    colorType["BLUE"] = "blue";
    colorType["RED"] = "red";
    colorType["GREEN"] = "green";
    colorType["YELLOW"] = "yellow";
})(colorType || (colorType = {}));
class Player {
    pos;
    color;
    constructor() {
        this.pos = 0;
    }
    chooseColor(color) {
        this.color = color;
    }
}
export default Player;
//# sourceMappingURL=player.js.map