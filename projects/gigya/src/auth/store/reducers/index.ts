import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  combineReducers,
  ActionReducer,
  Action,
  MetaReducer,
} from '@ngrx/store';
import * as fromGigyaUserTokenReducer from './gigya-user-token.reducer';
import { UserToken, AuthActions } from '@spartacus/core';

export interface GigyaAuthState {
  userToken: UserTokenState;
}

export interface UserTokenState {
  token: UserToken;
}

export function getReducers(): ActionReducerMap<GigyaAuthState> {
  return {
    userToken: combineReducers({ token: fromGigyaUserTokenReducer.reducer }),
  };
}
export const reducerToken: InjectionToken<ActionReducerMap<
  GigyaAuthState
>> = new InjectionToken<ActionReducerMap<GigyaAuthState>>('AuthReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearAuthState(
  reducer: ActionReducer<GigyaAuthState, Action>
): ActionReducer<GigyaAuthState, Action> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = {
        ...state,
        userToken: undefined,
      };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearAuthState];
