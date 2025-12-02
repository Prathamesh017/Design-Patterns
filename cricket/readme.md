1)Design a cricket scorecard that will show the score for a team along with score of each player.
so team has a score and list of players associated and each player will have a score , no of balls faced , 4s ,6s
ball can be type 1,2,3 4s,6s,wicket,wide,no
match class -score ,extras,totals 4s ,total 6s ,


Match: teams, current_innings, total_overs, total extras ,total score ,total 4s 6s , current over played, inning(who is batting and bowling)
Team: name, players[], total_score, total_wickets ,extra
Player: name, runs, balls_faced, fours, sixes, is_out , pos
Ball: type (1,2,3,4,6,W,WD,NB), runs_scored


Match has 2 Teams (1:2)
Team has 11 Players (1:many)
Match has many Balls (1:many)
Player faces many Balls (1:many)


this is on high level overview , instead of writing all the classes directly , we will do functionality by functionaltiy small steps
1) You will be given the number of players in each team, the number of overs and their batting order as input.
- A `Match class` which will be the main file , where we will take user's input , 
for intializing player , we will need `player class` - 
no of overs - will be main only , also batting order - we have store on team level , each player can have a pos thoug 


2) Then, we can input overs ball by ball with the runs scored on that ball (could be wide, no ball or a wicket as well).
- a ball can be (1,2,3,4,6,W,WD,NB) , if it is a valid run , player need to add runs , if it is extra - maintain extra on team level and match level , if is a wicket , change batsman , over change-strike change