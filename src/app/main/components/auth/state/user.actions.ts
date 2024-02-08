import { createAction, props } from "@ngrx/store";
import { Role } from "src/app/main/api/role";

export const setPoints     = createAction('[USER] Set Points', props<{points: number}>());
export const setBoosters   = createAction('[USER] Set Boosters', props<{boosters: number}>());
export const setId         = createAction('[USER] Set ID', props<{id: number}>());
export const setRole       = createAction('[USER] Set Role', props<{role: Role}>());
export const setUsername   = createAction('[USER] Set Username', props<{username: string}>());
export const setToken      = createAction('[USER] Set Token', props<{token: string}>());
export const setCreateTime = createAction('[USER] Set Create Time', props<{createTime: string}>());
