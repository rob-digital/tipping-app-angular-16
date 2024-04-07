import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';

interface ChartType {
    chartType: string
};
let initialChartType: ChartType = {
    chartType: "line"
};

export const dashboardReducer = createReducer(
    initialChartType,
    on(DashboardActions.setChartType, (state, actions) => {
        
        return {
            ...state,
            chartType: actions.chartType
        }
    })
);

// selectors ------------------------------
const getChartTypeState = createFeatureSelector<ChartType>("chartType");

export const getChartType = createSelector(getChartTypeState, state => state.chartType);
