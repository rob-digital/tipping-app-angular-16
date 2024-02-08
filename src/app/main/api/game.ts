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
    homeTeam: Team;
    awayTeam: Team;

    gameStatus: GameStatus;  // for points calculations



}
