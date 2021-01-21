import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions, UserState } from '@spartacus/core';
import { UserProfileState } from '../user-profile.state';
import * as fromResetPasswordReducer from './reset-password.reducer';
import * as fromTitlesReducer from './titles.reducer';

export function getReducers(): ActionReducerMap<UserProfileState> {
  return {
    titles: fromTitlesReducer.reducer,
    resetPassword: fromResetPasswordReducer.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  UserState
>> = new InjectionToken<ActionReducerMap<UserProfileState>>(
  'UserProfileReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserState];
