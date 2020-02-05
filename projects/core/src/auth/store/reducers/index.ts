import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { OCC_USER_ID_ANONYMOUS } from 'projects/core/src/occ';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { ClientToken } from '../../models/token-types.model';
import { occUserIdReducer } from '../../occ-user-id/store/reducers/occ-user-id.reducer';
import { AuthActions } from '../actions/index';
import { AuthState, CLIENT_TOKEN_DATA } from '../auth-state';
import * as fromUserTokenReducer from './user-token.reducer';

export function getReducers(): ActionReducerMap<AuthState> {
  return {
    userToken: combineReducers({ token: fromUserTokenReducer.reducer }),
    clientToken: loaderReducer<ClientToken>(CLIENT_TOKEN_DATA),
    occUserId: occUserIdReducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<AuthState>
> = new InjectionToken<ActionReducerMap<AuthState>>('AuthReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearAuthState(
  reducer: ActionReducer<AuthState, Action>
): ActionReducer<AuthState, Action> {
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = {
        ...state,
        userToken: undefined,
        occUserId: OCC_USER_ID_ANONYMOUS,
      };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearAuthState];
