import Team from "./team";
type status="YET"|"PLAY"|"OUT"
class Player{
   private name:string
   private pos:number;
   private team:Team;
   private noOfRuns:number=0;
   private noOfBalls:number=0;
   private noOfFours:number=0;
   private noOfsixes:number=0;
   private status:status="YET";

   constructor(name:string,pos:number,team:Team){
     this.name=name;
     this.pos=pos;
     this.team=team;
   }
   setRun(run:number,isFour:boolean,isSix:boolean,isExtra=false){
    this.noOfRuns+=run;
    if(!isExtra){
    this.noOfBalls++;
    }
    if(isFour){
        this.noOfFours++;
    }else if(isSix){
        this.noOfsixes++;
    }
   }
   setPlay(status:status){
    this.status=status;
   }
   
}

export default Player;