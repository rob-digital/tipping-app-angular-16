import { createAction, props } from '@ngrx/store';
import { Game } from 'src/app/main/api/game';

export const loadAllGames         = createAction('[PREDICTIONS] Load all games');                                          // once dispatched the http request should be issued
export const loadAllGames_Success = createAction('[PREDICTIONS] Load all games SUCCESS!!!', props<{allGames: Game[]}>());
export const loadAllGames_Failure = createAction('[PREDICTIONS] Load all games ***Failure***', props<{error: string}>());

export const setGamesByDate = createAction('[PREDICTIONS] Set games by dates', props<{dailyGames: []}>());
