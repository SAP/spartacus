import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { OpenIdToken } from '../../models/kyma-token-types.model';
import { KymaState, OPEN_ID_TOKEN_DATA } from '../kyma-state';

export function getReducers(): ActionReducerMap<KymaState> {
  return {
    openIdToken: loaderReducer<OpenIdToken>(OPEN_ID_TOKEN_DATA),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  KymaState
>> = new InjectionToken<ActionReducerMap<KymaState>>('KymaReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearKymaState(
  reducer: ActionReducer<KymaState, Action>
): ActionReducer<KymaState, Action> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = {
        ...state,
        openIdToken: undefined,
      };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearKymaState];
