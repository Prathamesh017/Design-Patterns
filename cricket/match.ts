import Team from "./team";
import Player from "./player";
class Match{
    private teamA!:Team
    private teamB!:Team
    private totalMatchOvers:number;
    private oversPlayed:number=1;

    // intalizing team , overs
    constructor(teamA:string,teamB:string,noOfPlayers:number,matchOvers:number){
        this.totalMatchOvers=matchOvers
        this.setTeamA(teamA,noOfPlayers);
        this.setTeamB(teamB,noOfPlayers);
        this.handleToss();
    }
    setTeamA(teamName:string,noOfPlayers:number){
        this.teamA= new Team(teamName,6)
        this.teamA.setPlayers(noOfPlayers)
    }
/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Set the team B.
     * @param {string} teamName - the name of team B
     * @param {number} noOfPlayers - the number of players in team B
     */
/*******  bd5e492e-e80b-40cd-9159-c975683a82c1  *******/
     setTeamB(teamName:string,noOfPlayers:number){
        this.teamB= new Team(teamName,6)
        this.teamB.setPlayers(noOfPlayers)
    }
    handleToss(){
        let val=Math.random();
        if(val>0.5){
            this.teamA.handleInning(true);
            this.teamB.handleInning(false);
        }else{
            this.teamA.handleInning(false);
            this.teamB.handleInning(true);
        }
    }
    getBattingTeam(){
        return this.teamA.isBat===true?this.teamA:this.teamB;
    }
    startGame(noofOvers:number,overs:string[][],overs2:string[][]){
        const teamA=this.getBattingTeam();
        this.handleInnings(teamA,noofOvers,overs);
        console.log("----- INNING BREAK")
        this.teamA.handleInning(!this.teamA.isBat)
        this.teamB.handleInning(!this.teamB.isBat)
        const teamB=this.getBattingTeam();
        this.handleInnings(teamB,noofOvers,overs2);
        console.log("----- INNING BREAK")

        if(this.teamA.getScore()>this.teamB.getScore()){
            console.log("TEAM A WINS")
        }
        else{
            console.log("TEAM B WINS")
        }





    


    }
    handleInnings(team:Team,noofOvers:number,overs:string[][]){   
         for(let i=0;i<noofOvers;i++){
            let over=overs[i];
            let isGameOver=team.handleOver(over)
            if(isGameOver){
                break;  
            }
            this.oversPlayed++;
        }
        
    }
    
}

const match=new Match('IND','AUS',5,6);
const innings1: string[][] = [
    ["1", "4", "2", "6", "W", "1"],      // Over 1
    ["NB", "4", "1", "2", "3", "W"],     // Over 2
    ["6", "1", "4", "2", "1", "6"],      // Over 3
    ["WI", "4", "1", "NB", "6", "2"],     // Over 4
    ["2", "1", "WI", "4", "1", "3"],      // Over 5
    ["4", "6", "1", "2", "WI", "1"]       // Over 6
];
const innings2: string[][] = [
    ["2", "1", "4", "W", "6", "3"],       // Over 1
    ["NB", "6", "2", "1", "WI", "4"],     // Over 2
    ["1", "3", "4", "2", "6", "W"],       // Over 3
    ["WI", "2", "1", "NB", "4", "6"],     // Over 4
    ["3", "1", "2", "WI", "4", "1"],      // Over 5
    ["6", "4", "W", "2", "1", "NB"]       // Over 6
];

match.startGame(6,innings1,innings2);


export default Match;

