import { Bishop, King, Knight, Move, Pawn, Queen, Rook } from "./piece";
import Player from "./player";
import Spot, { colorType } from "./spot";
class Board{
    spots:Spot[][]=[]    
    initalizeBoard(){
     for(let i=0;i<8;i++){
            this.spots[i]=[] ;
            for(let j=0;j<8;j++){
                let color:colorType=(j+i)%2===0?"WHITE":"BLACK"
                const spot=new Spot(i,j,color)
                this.spots[i][j]=spot;  
            }
        }
    }

    initializePawns() {
  // White pawns at row 1
    for (let col = 0; col < 8; col++) {
    const spot =  this.spots[1][col];
    const pawn = new Pawn("WHITE", spot);
    spot.setPiece(pawn);
  }
  
  // Black pawns at row 6
  for (let col = 0; col < 8; col++) {
    const spot = this.spots[6][col];
    const pawn = new Pawn("BLACK", spot);
    spot.setPiece(pawn);
  }
}
initalizeRest(){
  const pieceOrder = [
        Rook,   // column 0
        Knight, // column 1
        Bishop, // column 2
        Queen,  // column 3
        King,   // column 4
        Bishop, // column 5
        Knight, // column 6
        Rook    // column 7
    ];

        for (let col = 0; col < 8; col++) {
        const spot =  this.spots[0][col];
        const pawn = new pieceOrder[col]("WHITE", spot);
        spot.setPiece(pawn);
    }
    for (let col = 0; col < 8; col++) {
    const spot = this.spots[7][col];
    const pawn = new pieceOrder[col]("BLACK", spot);
    spot.setPiece(pawn);
  }
}
makeAMove(player:Player,move:Move){
    let {from,to}=move;
    let spotFrom=this.spots[from[0]][from[1]];
    let piece=spotFrom.getPiece()
    if(piece && piece.isValidMove(move,this.spots)){
        piece.makeMove(move,this.spots)
    }


}
}

const board=new Board();
board.initalizeBoard();
const player1=new Player("BLACK");
const player2=new Player("WHITE");
board.makeAMove(player1,{from:[0,1],to:[1,1]})


export default Board;