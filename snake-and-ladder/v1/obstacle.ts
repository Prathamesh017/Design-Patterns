export type ObstacleType = "SNAKE" | "LADDER"
class Obstacle{
    type:ObstacleType;
    start:number;
    end:number;
    constructor(type:ObstacleType,start:number,end:number){
        this.type=type;
        this.start=start;
        this.end=end;
    }

}

export default Obstacle;