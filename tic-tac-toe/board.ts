class Board{
    private board:string[][]=[]
    private count:number=0
    constructor(){
        //const arr = Array.from({ length: 3 });  making a single sized array
        this.board=Array.from({length:3},()=>{return Array.from({length:3},()=>'')})
    }
    playTurn(player:Player,x:number,y:number){
        if(x>=3 ||y>=3 || x<0 ||y<0){
            console.log("INVALID MOVE");
            return;
        }
        //check if it occupied
        let isOccuppied=this.board[x][y];
        if(isOccuppied!==""){
            console.log("Already Marked ,Try Some Another Position")
            return;
        }

        this.board[x][y]=player.turn;
        /*
         * YOU CAN WIN IN 3 WAYS
          a)row wise check
          b) column wise check
          c) diagonal  
         */

          //;ets check for rows
          if(this.board[x][0]==this.board[x][1] && this.board[x][2]==this.board[x][1]){
            console.log(`Player ${player.name} won ${this.board[x][0]} turn`)
            return;
          }
          if(this.board[0][y]==this.board[1][y] && this.board[1][y]==this.board[2][y]){
            console.log(`Player ${player.name} won with ${this.board[0][y]} turn`)
            return;
          }

          //left diagonal
          if(this.board[0][0]===this.board[1][1]&& this.board[1][1]===this.board[2][2]){
            console.log(`Player ${player.name} won with ${this.board[0][0]} turn`)
            return;
            
          }
           if(this.board[0][2]===this.board[1][1]&& this.board[1][1]===this.board[2][0]){
            console.log(`Player ${player.name} won with ${this.board[0][3]} turn`)
            return;
            
          }
          if(this.count+1==9){
            return console.log("GAME OVER")
          }
          this.count++;
          


        //mark it
    }


}

const board=new Board();
const player1=new Player("A","X");
const player2=new Player("B","O");
board.playTurn(player1,1,2);
board.playTurn(player1, 0, 0);
board.playTurn(player2, 1, 1);
board.playTurn(player1, 0, 1);
board.playTurn(player2, 2, 2);
board.playTurn(player1, 0, 2); // Player A wins (row 0)


