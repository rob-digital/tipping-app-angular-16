import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Role } from "src/app/main/api/role";
import * as AppUserActions from './user.actions';
import { AppUser } from "src/app/main/api/user";

export let appUser: AppUser = {
    id: 0,
    token: "",
    createTime: "",
    role: Role.USER,
    username: "",
    points: 11,
    boosters: 7,

}

export let userReducer = createReducer(
    appUser,
    on(AppUserActions.setBoosters, (state, action): AppUser => {
        return {
            ...state,
            boosters: action.boosters
        }
    }),
    on(AppUserActions.setPoints, (state, action): AppUser => {
        return {
            ...state,
            points: action.points
        }
    }),
    on(AppUserActions.setId, (state, action): AppUser => {
        return {
            ...state,
            id: action.id
        }
    }),
    on(AppUserActions.setRole, (state, action): AppUser => {
        return {
            ...state,
            role: action.role
        }
    }),
    on(AppUserActions.setUsername, (state, action): AppUser => {
        return {
            ...state,
            username: action.username
        }
    }),
     on(AppUserActions.setToken, (state, action): AppUser => {
        return {
            ...state,
            token: action.token
        }
    }),
    on(AppUserActions.setCreateTime, (state, action): AppUser => {
        return {
            ...state,
            createTime: action.createTime
        }
    }),

);

// selectors ------------
const getUserState = createFeatureSelector<AppUser>('appUser');

export const getBoosters   = createSelector(getUserState, state => state.boosters);
export const getPoints     = createSelector(getUserState, state => state.points);
export const getUserId     = createSelector(getUserState, state => state.id);
export const getUsername   = createSelector(getUserState, state => state.username);
export const getRole       = createSelector(getUserState, state => state.role);
export const getToken      = createSelector(getUserState, state => state.token);
export const getCreateTime = createSelector(getUserState, state => state.createTime);
