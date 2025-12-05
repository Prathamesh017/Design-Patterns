import { colorType } from "./spot";
import Spot from "./spot";
export interface Move{
    from:[number,number]
    to:[number,number]
}

abstract class Piece{
    color!:colorType
    pos!:Spot
    isAlive:boolean=true;
    constructor(color: colorType, pos: Spot) {
    this.color = color;
    this.pos = pos;
  }
    abstract isValidMove(move:Move,board:Spot[][]):boolean 

    markKill(): void {
        this.isAlive=false;
    }
    makeMove(move: Move,board:Spot[][]): void {
        let {from,to}=move;
         let spotFrom=board[from[0]][from[1]];
         let spotTo=board[to[0]][to[1]];
         const exisingPiece=spotTo.getPiece();
         let pieceToMove=spotFrom.getPiece() as Piece
           if(exisingPiece){
            if(exisingPiece.color===spotFrom?.getPiece()?.color){
                console.log("SAME COLOR PIECE,CAN'T KILL")
                return;
            }
            exisingPiece.markKill();
            console.log("KILLED HAPPEND");
           }
           
           spotTo.setPiece(pieceToMove)
           pieceToMove.pos=spotTo;
           console.log("PIECE MOVED")
            
              
     }
    // abstract makeMove(move:Move):void
}


export class Pawn extends Piece{
    constructor(color:colorType,pos:Spot){
        super(color,pos);
    }
    isValidMove(move:Move, board: Spot[][]): boolean {
         const {from,to}=move;
         let spotFrom=board[from[0]][from[1]];
         let spotTo=board[to[0]][to[1]];
          if (!spotFrom.getPiece()) {
          console.log("No piece at starting spot");
          return false; 
          }

          /*
           There can be 2 types of movement
           a) straight 
           b) diagonal if we are  killing a piece
           */
          //A .Staight Movement

          //checking the direction as well , as white will go up 00->77 and black moves up 77->00
          const dir = board[from[0]][from[1]].getPiece()?.color === "WHITE" ? 1 : -1;
           if((dir===1 && to[0]>from[0]) || (dir===-1 && to[0]<from[0])){
                }else{
                    return false;
            }
          if(to[1]==from[1]){
            /* Now 2 Scenerios , difference can be of one or two
             * 
             */
            //1 - difference of 1
            if(Math.abs(to[0]-from[0])===1){
            
            let existPiece=board[to[0]][to[1]].getPiece();
            if(existPiece){
                console.log("PIECE ALREADY EXIST ")
                return false;
            }
                console.log("VALID MOVE")
                return true;
            }
            //2 - difference of 2
            if(Math.abs(to[0]-from[0])===2 && (from[0]===1 || from[0]===6)){
                //checks for internmidate and the final jump step as well to check if a piece exists there 
            let existPiece = board[to[0]][to[1]].getPiece() || board[from[0] + dir][from[1]].getPiece();

             if(existPiece){
                console.log("PIECE ALREADY EXIST ")
                return false;
            }
                return true;
            }
            return false;
          }
          
          //B . Diagonal Movement
          if(Math.abs(to[0]-from[0])==1 && Math.abs(to[1]-from[1])==1){
            let existPiece=board[to[0]][to[1]].getPiece();
            if(!existPiece){
                console.log("INVALID MOVE")
                return false;
            }
            if(existPiece.color===board[from[0]][from[1]].getPiece()?.color){
                console.log("SAME COLOR PAWN")
                return false
            }
            return true;
          }

          

          
          return false;
    }
    
}



export class Rook extends Piece{
    constructor(color:colorType,pos:Spot){
        super(color,pos);
    }
    isValidMove(move:Move, board: Spot[][]): boolean {
        const {from,to}=move;
        let spotFrom=board[from[0]][from[1]];
        let spotTo=board[to[0]][to[1]];
        if (!spotFrom.getPiece()) {
          console.log("No piece at starting spot");
          return false; 
        }

        //check the `to` path is valid 
        if(from[0] !== to[0] && from[1] !== to[1]){
            //invalid move
            console.log(" Invalid move" )
            return false;
        }

        //check for path exist
        let dirx=from[0]>to[0]?-1:1;
        let diry=from[1]>to[1]?-1:1;

        let pathx=from[0]+dirx;
        let pathy=from[1]+diry;
        if(from[1]===to[1]){
            while(pathx!==to[0]){
            let pieceExistInPath=board[pathx][from[1]].getPiece()
            if(pieceExistInPath){
                //piece exist in the path , invalid move
                console.log('piece exist in the path , invalid move')
                return false;
            }
            pathx+=dirx
        }
        }else{
            while(pathy!==to[1]){
            let pieceExistInPath=board[from[0]][pathy].getPiece()
             if(pieceExistInPath){
                //piece exist in the path , invalid move
                console.log('piece exist in the path , invalid move')
                return false;
            }
            pathy+=diry
        }

        }
          
          return true;
    }
   



}

export class Bishop extends Piece{
    constructor(color:colorType,pos:Spot){
        super(color,pos);
    }
    isValidMove(move:Move, board: Spot[][]): boolean {
        const {from,to}=move;
        let spotFrom=board[from[0]][from[1]];
        let spotTo=board[to[0]][to[1]];
        

          if (!spotFrom.getPiece()) {
          console.log("No piece at starting spot");
          return false; 
          }
          
    
        //check if it is valid
        //simple to understand , the distance between x of from and y of `from`  will be always equal with x and y if 2
        // (2,3) - [4,5] always (4-2) ===(5-3) will always be same for any diagonal
          if (Math.abs(from[0] - to[0]) !== Math.abs(from[1] - to[1])) {
              return false; // not a diagonal move
           }
        
        //decide to move in the same directions as to from `from` value to check if already a peice eixst in the path or not
        let x=to[0]>from[0]?1:-1
        let y=to[1]>from[1]?1:-1

        let pathx=from[0]+(x);
        let pathy=from[1]+(y);

        while(pathx!==to[0] && pathy!==to[1]){
            let pieceExistInPath=board[pathx][pathy].getPiece();
            if(pieceExistInPath){
                //piece exist in the path , invalid move
                console.log('piece exist in the path , invalid move')
                return false;
            }
            pathx+=x
            pathy+=y;
        }
        console.log("VALID MOVE")



        return true
    }

    makeMove(move: Move,board:Spot[][]): void {
        let {from,to}=move;
         let spotFrom=board[from[0]][from[1]];
         let spotTo=board[to[0]][to[1]];
         const exisingPiece=spotTo.getPiece();
         let pieceToMove=spotFrom.getPiece() as Piece
           if(exisingPiece){
            if(exisingPiece.color===spotFrom?.getPiece()?.color){
                console.log("SAME COLOR PIECE,CAN'T KILL")
                return;
            }
            exisingPiece.markKill();
            console.log("KILLED HAPPEND");
           }
           
           spotTo.setPiece(pieceToMove)
           pieceToMove.pos=spotTo;
           console.log("PIECE MOVED")
            
              
     }
    
    
     //one of the alternative ways
    // generateAllvalidPaths(fromx:number,fromy:number){
    //     let validPaths:number[][]=[];
    //     //topleft;
    //     let left=fromx-1;
    //     let right=fromy-1;
    //     while(left>=0 && right>=0){
    //         validPaths.push([left,right])
    //         left--;
    //         right--
    //     }
    //     left=fromx-1;
    //     right=fromy+1
    //     while(left>=0 && right<=7){
    //         validPaths.push([left,right])
    //         left--;
    //         right++;
    //     }

    //     left=fromx+1;
    //     right=fromy+1
    //     while(left<=7 && right<=7){
    //         validPaths.push([left,right])
    //         left++;
    //         right++;
    //     }
    //     left=fromx+1;
    //     right=fromy-1;

    //      while(left<=7 && right>=0){
    //         validPaths.push([left,right])
    //         left++;
    //         right--;
    //     }
        

    // }
}
export class Knight extends Piece{
    constructor(color:colorType,pos:Spot){
        super(color,pos);
    }
    isValidMove(move:Move, board: Spot[][]): boolean {
        const {from,to}=move;
        let spotFrom=board[from[0]][from[1]];
        if (!spotFrom.getPiece()) {
          console.log("No piece at starting spot");
          return false; 
        }
        /*
         A Knight moves
         a) 2 steps in same direction
         b) one step in particular direction

         */ 

         if (
  (Math.abs(from[0] - to[0]) === 2 && Math.abs(from[1] - to[1]) === 1) ||
  (Math.abs(from[0] - to[0]) === 1 && Math.abs(from[1] - to[1]) === 2)
) {
    // valid knight move
     const targetPiece = board[to[0]][to[1]].getPiece();
        if (targetPiece && targetPiece.color === board[from[0]][from[1]].getPiece()?.color) {
            console.log("Can't capture own piece");
            return false;
        }
        return true;
}

        return false;
    }
}

export class Queen extends Piece{
    constructor(color:colorType,pos:Spot){
        super(color,pos);
    }
    isValidMove(move:Move, board: Spot[][]): boolean {
         const {from,to}=move;
        let spotFrom=board[from[0]][from[1]];
        let spotTo=board[to[0]][to[1]];
        

          if (!spotFrom.getPiece()) {
          console.log("No piece at starting spot");
          return false; 
          }

         /*
         Can move in 2 directions 
         a) straight
         b) diagonal

         it should one of them else false
          * 
          */

         //! Diagonal move (bishop logic) 
    if (Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) {
        let x=to[0]>from[0]?1:-1
        let y=to[1]>from[1]?1:-1

        let pathx=from[0]+(x);
        let pathy=from[1]+(y);

        while(pathx!==to[0] && pathy!==to[1]){
            let pieceExistInPath=board[pathx][pathy].getPiece();
            if(pieceExistInPath){
                //piece exist in the path , invalid move
                console.log('piece exist in the path , invalid move')
                return false;
            }
            pathx+=x
            pathy+=y;
        }
    }
    //check for straight - one direction should be same
    else if(from[0] === to[0] || from[1] === to[1]){
        //check for path exist
        let dirx=from[0]>to[0]?-1:1;
        let diry=from[1]>to[1]?-1:1;
        let pathx=from[0]+dirx;
        let pathy=from[1]+diry;
        if(from[1]===to[1]){
            while(pathx!==to[0]){
            let pieceExistInPath=board[pathx][from[1]].getPiece()
            if(pieceExistInPath){
                //piece exist in the path , invalid move
                console.log('piece exist in the path , invalid move')
                return false;
            }
            pathx+=dirx
        }
        }else{
            while(pathy!==to[1]){
            let pieceExistInPath=board[from[0]][pathy].getPiece()
             if(pieceExistInPath){
                //piece exist in the path , invalid move
                console.log('piece exist in the path , invalid move')
                return false;
            }
            pathy+=diry
        }

        }
    }else{
        console.log("INVALID MOVE");
        return false;
    }

     const targetPiece = board[to[0]][to[1]].getPiece();
    if (targetPiece && targetPiece.color === board[from[0]][from[1]].getPiece()?.color) {
        console.log("Can't capture own piece");
        return false;
    }
        
        return true
    }
}

export class King extends Piece{
    constructor(color:colorType,pos:Spot){
        super(color,pos);
    }
    isValidMove(move:Move, board: Spot[][]): boolean {
         let {from,to}=move;
         let spotFrom=board[from[0]][from[1]];
         let spotTo=board[to[0]][to[1]];

         if (!spotFrom.getPiece()) {
          console.log("No piece at starting spot");
          return false; 
        }

        if(Math.abs(from[0]-to[0])<=1 && Math.abs(from[1]-to[1])<=1){
            const targetPiece = board[to[0]][to[1]].getPiece();
          if (targetPiece && targetPiece.color === spotFrom.getPiece()?.color) {
              return false; // can't capture own piece
            }
            return true;
        }
        

         return false;
    }
}



export default Piece;