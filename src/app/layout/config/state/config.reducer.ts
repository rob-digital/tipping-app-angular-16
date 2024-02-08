import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as ConfigActions from './config.actions';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    darkModeActive: boolean;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}
const config: AppConfig = {
    ripple: true,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    darkModeActive: false,
    scale: 14,
};

const initialLayoutState: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
};


export const configReducer = createReducer(
    config,         // setting initial state of store
    on(ConfigActions.toggleRippleEffect, (state): AppConfig => {
        return {
            ...state,
            ripple: !state.ripple
        };
    }) ,
    on(ConfigActions.darkModeActive, (state, action): AppConfig => {
        return {
            ...state,
            darkModeActive: action.darkMode
        };
    })
);


// - selectors get existing state
// - selectors ------------ should be defined separately for each bit of state
const getConfigState = createFeatureSelector<AppConfig>('configs');

export const getShowRipple = createSelector(
    getConfigState,
    state => state.ripple
)
export const getShowDarkMode = createSelector(
    getConfigState,
    state => state.darkModeActive
)
