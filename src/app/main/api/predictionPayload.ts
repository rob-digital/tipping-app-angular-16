export class PredictionPayload {

    gameId: number;
    homeTeam: {
        name: string;
        goals : number;
    };
    awayTeam: {
        name: string;
        goals : number;
    };
    boostScoreXTimes: number;
    double: boolean;

    constructor()
    {
        this.gameId = 0;
        this.homeTeam.name = '';
        this.homeTeam.goals = 0;
        this.awayTeam.name = '';
        this.awayTeam.goals = 0;
        this.boostScoreXTimes = 1;
        this.double = true;
    }

  }
