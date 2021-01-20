import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { UserState } from '../user-details.state';
import * as fromUserDetailsReducer from './user-details.reducer';

export * from './user-details.reducer';

export function getReducers(): ActionReducerMap<UserState> {
  return {
    account: combineReducers({
      details: fromUserDetailsReducer.reducer,
    }),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  UserState
>> = new InjectionToken<ActionReducerMap<UserState>>('UserReducers');

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
