import { createAction, props } from '@ngrx/store';

export const setPosition = createAction('[TABLES] Set Position in table', props<{ position: number }>());
export const setTeamName = createAction('[TABLES] Set team name', props<{ teamName: string }>());
