import { createAction, props } from "@ngrx/store";

export const setGameId           = createAction('[Prediction] Set game id', props<{gameId: number}>());
export const setHomeTeam         = createAction('[Prediction] Set goals Home Team', props<{homeTeam: { name: string, goals: number } }>());
export const setAwayTeam         = createAction('[Prediction] Set goals Away Team', props<{awayTeam: { name: string, goals: number } }>());
export const setBoostScoreXTimes = createAction('[Prediction] Set boost score X-times', props<{boost: number}>());
