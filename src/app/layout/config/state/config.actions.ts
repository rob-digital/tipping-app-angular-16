import { createAction, props } from "@ngrx/store";

export const toggleRippleEffect = createAction(
    '[CONFIG] Toggle ripple',
    // second argument is metadata (using props function) which discribes data associated with this action
    // this action doesn't need a second argument because have no associated data
    // it would be: props<{ product: Product }>()
    props<{toggle: boolean}>()
)
export const darkModeActive = createAction(
    '[CONFIG] Dark Mode Active',
    props<{darkMode: boolean}>()
);
