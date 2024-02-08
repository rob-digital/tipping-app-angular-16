import { createSelector} from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import * as GamesActions from './games.actions';

interface Games {
    games: any[]
}


// ---- All Games ------------------------------------------
export const initialState_AllGames: Games = {
    games: []
}

export const allGamesReducer = createReducer(
    initialState_AllGames,
    on(GamesActions.loadAllGames_Success, (state, action) => {
        return {
            ...state,
            games: [...state.games, action.allGames]
        }
    })
);

const getGames = createFeatureSelector('allGames');

export const getAllGames = createSelector(getGames, state => state);


// ---- Games By Date ------------------------------------------

export const initialState_GamesByDate: Games = {
    games: []
}

export const gamesByDateReducer = createReducer(
    initialState_GamesByDate,
    on(GamesActions.setGamesByDate, (state, action) => {
        return {
            ...state,
            games: [...state.games, action.dailyGames]
        }
    })
)

const getGamesByDate = createFeatureSelector('gamesByDate');

export const getAllGamesByDate = createSelector(getGamesByDate, state => state);
