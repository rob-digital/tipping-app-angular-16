import { createAction, props } from '@ngrx/store';
import { PredictionPayload } from 'src/app/main/api/predictionPayload';


export const addPayloadToSlip                = createAction('[SLIP-STATE] Add payload to slip', props<{ payload: PredictionPayload }>());
export const deletePayloadFromSlip           = createAction('[SLIP-STATE] Remove payload from slip', props<{ gameId: number }>());
export const updateBoosterForSelectedPayload = createAction('[SLIP-STATE] Update booster', props<{ gameId: number, boostScoreXTimes: number }>());
