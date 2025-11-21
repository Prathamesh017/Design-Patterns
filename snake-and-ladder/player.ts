 export enum colorType{
    BLUE="blue",
    RED="red",
    GREEN="green",
    YELLOW="yellow"
}
interface player{
    pos:number;
    color:colorType
}
class Player{
    pos:number;
    color!:colorType;

    
    constructor(){
        this.pos=0;
    }

    chooseColor(color:colorType){
        this.color=color;
    }
    

}
export default Player;