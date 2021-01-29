import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { UserAccountState } from '../user-account.state';
import * as fromUserAccountReducer from './user-account.reducer';

export * from './user-account.reducer';

export function getReducers(): ActionReducerMap<UserAccountState> {
  return {
    account: combineReducers({
      details: fromUserAccountReducer.reducer,
    }),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  UserAccountState
>> = new InjectionToken<ActionReducerMap<UserAccountState>>('UserReducers');

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
