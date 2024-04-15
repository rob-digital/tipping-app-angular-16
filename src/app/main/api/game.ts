import { GameStatus } from './gameStatus';
import { KnockoutStageGame } from './knockoutStageGame';
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
    knockoutStageGame: KnockoutStageGame;
    winsAfterPenalties: YesOrNo;

}

export interface ScorePayload {
    goalsHome: number;
    goalsAway: number;
    status: GameStatus;
}

export interface GameId {
    gameId: number;
}

export enum YesOrNo {
    YES = 'YES',
    NO = 'NO'
}
