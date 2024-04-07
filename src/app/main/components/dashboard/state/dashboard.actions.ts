import { props, createAction } from '@ngrx/store';

export const setChartType = createAction("[DASHBOARD] Set Chart Type", props<{ chartType: string }>());
