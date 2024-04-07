import { GameStatus } from './gameStatus';
import { Team } from './team';
export interface Game {
    id: number;
    matchDatetime: Date;
    stadium: string;
    city: string;
    stage: string
    goalsHomeTeam: number;
    goalsAwayTeam: number;
    oddsHome: number;
    oddsDraw: number;
    oddsAway: number;
    homeTeam: Team;
    awayTeam: Team;
    status: GameStatus;  // for points calculations

}

export interface ScorePayload {
    goalsHome: number;
    goalsAway: number;
    status: GameStatus;
}

export interface GameId {
    gameId: number;
}
