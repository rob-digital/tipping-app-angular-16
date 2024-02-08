import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import * as SlipActions from './slip-state.actions';
import { PredictionPayload } from 'src/app/main/api/predictionPayload';


interface SlipState {
    predictions: PredictionPayload[]
}
// export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: SlipState = {
    predictions: []
}



export const slipStateReducer = createReducer(
    initialState,
    on(SlipActions.addPayloadToSlip, (state, action): SlipState => {
        return {
            ...state,
            predictions: [...state.predictions, action.payload]
        }
    }),
    on(SlipActions.deletePayloadFromSlip, (state, action) => {
        return {
            ...state,
            predictions: state.predictions.filter(el => el.gameId != action.gameId)
        }
    }),
    on(SlipActions.updateBoosterForSelectedPayload, (state, action) => {

        let selectedGame = state.predictions.find(el => el.gameId == action.gameId);
        let modifiedGame = {...selectedGame}
        modifiedGame.boostScoreXTimes = action.boostScoreXTimes;
        modifiedGame.double = action.boostScoreXTimes == 2 ? true : false
        console.log('modifiedGame:', modifiedGame)
        let index = state.predictions.findIndex(el => el == selectedGame)

        return {
            ...state,
            predictions: state.predictions.map(el => el == selectedGame ? modifiedGame : el)
        }
    })
)

const getSlipState = createFeatureSelector<SlipState>('slipState');

export const getFullSlipState = createSelector(getSlipState, state => state.predictions);
