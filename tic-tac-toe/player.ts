type TURN="O"|"X";
class Player{
    name:string
    turn:TURN
    constructor( name:string,turn:TURN){
        this.name=name;
        this.turn=turn;
    }
}