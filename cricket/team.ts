import Player from "./player";
class Team{
    private name:string;
    private players:Player[]=[]
    public isBat!:boolean;
    private striker!:Player;
    private nonstriker!:Player;
    private noOfWickets=0;
    private extras:number=0;
    private scores:number=0;
    private totalOvers:number;
    constructor(name:string,totalOvers:number){
        this.name=name;
        this.totalOvers=totalOvers;
    }
    handleInning(isBat:boolean){
        this.isBat=isBat;
        if(this.isBat){
            this.striker=this.getPlayeratPos(0);
            this.nonstriker=this.getPlayeratPos(1);

        }
    }
    setPlayers(noOfPlayers:number){
        for (let i = 0; i < noOfPlayers; i++) {
            const player=new Player(`${this.name}-${i}`,i+1,this)
            this.players.push(player);
        }
    }
    handleOver(overArr:string[]){
        //
        let allWicketsDown=false;
        for (let i = 0; i < overArr.length; i++) {
            let val=overArr[i];
            if(val==="1"){
                this.striker.setRun(1,false,false);
                this.scores+=1;
                this.strikeChange();
            }else if(val==="2"){
                this.striker.setRun(2,false,false);
                this.scores+=2;
            }else if(val=="3"){
                this.striker.setRun(3,false,false);
                this.scores+=3;
                this.strikeChange();
            }else if(val=="4"){
                this.striker.setRun(4,true,false);
                this.scores+=4;
            }
            else if(val=="6"){
                this.striker.setRun(6,false,true);
                this.scores+=6;
            }
            else if(val==="W" || val==="NB"){
                this.extras++;
                this.scores+=1;
                this.striker.setRun(0,false,false,true)
            }else if(val==="WI") {
                this.striker.setPlay("OUT");
                this.noOfWickets++;
                if(this.noOfWickets >= this.players.length - 1){
                    allWicketsDown=true;
                    break;
                }
                this.striker=this.getPlayeratPos(this.noOfWickets+1);
                this.striker.setPlay("PLAY");
            }
        }
        this.strikeChange();
        return allWicketsDown;
    }
    strikeChange(){
          let temp=this.striker;
                this.striker=this.nonstriker;
                this.nonstriker=temp;
    }
    getPlayeratPos(pos:number){
        const player=this.players[pos] as Player;
        return player;
    }
    getScore(){
        return this.scores;
    }   
}

export default Team;