import { createReducer, on } from '@ngrx/store';
import * as TablesActions from './tables.actions';

interface TableRow {
    position: number;
    teamName: string;
}

let initialTableState: TableRow =
    { position: 1, teamName: 'A' }
    // { position: 2, teamName: 'B' },
    // { position: 3, teamName: 'C' },
    // { position: 4, teamName: 'D' }
;

export const teamsReducer = createReducer(
    initialTableState,
    on(TablesActions.setPosition, (state, action) => {
        return {
            ...state,
            position: action.position
        }
    }),
    on(TablesActions.setTeamName, (state, action) => {
        return {
            ...state,
            teamName: action.teamName
        }
    })
)
