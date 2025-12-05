export type colorType="WHITE"|"BLACK"
import Piece from "./piece";
class Spot{
    private x:number;
    private y:number;
    private color:colorType
    private piece:Piece|null=null;

    constructor(x:number,y:number,color:colorType,piece:Piece|null=null){
        this.color=color;
        this.x=x;
        this.y=y;
        this.piece=piece;
    }
    setPiece(piece:Piece){
        this.piece=piece;
    }
    getPiece(){
        return this.piece;
    }
   
}
export default Spot;