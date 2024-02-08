import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { PredictionPayload } from "src/app/main/api/predictionPayload";
import * as PredictionActions from './prediction.actions';

let initialPredictionPayload: PredictionPayload = {
    gameId: 0,
    homeTeam: {
        name: '',
        goals : 0,
    },
    awayTeam: {
        name: '',
        goals : 0,
    },
    boostScoreXTimes: 1,
    double: false
}

export const predictionReducer = createReducer(
    initialPredictionPayload,
    on(PredictionActions.setGameId, (state, action): PredictionPayload => {

        return {
            ...state,
            gameId: action.gameId
        }
    }),
    on(PredictionActions.setHomeTeam, (state, action): PredictionPayload => {
        return {
            ...state,
            homeTeam: {
                name: action.homeTeam.name,
                goals: action.homeTeam.goals
            }
        }
    }),
    on(PredictionActions.setAwayTeam, (state, action): PredictionPayload => {
        return {
            ...state,
            awayTeam: {
                name: action.awayTeam.name,
                goals: action.awayTeam.goals
            }
        }
    }),
    on(PredictionActions.setBoostScoreXTimes, (state, action): PredictionPayload => {
        return {
            ...state,
            boostScoreXTimes: action.boost,
        }
    }),
);


// selectors ---------------------
const getPredictionState = createFeatureSelector<PredictionPayload>('predictionPayload');

export const getGameId             = createSelector(getPredictionState, state => state.gameId);
export const getHomeTeamPrediction = createSelector(getPredictionState, state => state.homeTeam);
export const getAwayTeamPrediction = createSelector(getPredictionState, state => state.awayTeam);
export const getBoostScoreXTimes   = createSelector(getPredictionState, state => state.boostScoreXTimes);
