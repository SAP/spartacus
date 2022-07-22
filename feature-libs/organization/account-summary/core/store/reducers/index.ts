import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions, ListModel, StateUtils } from '@spartacus/core';
import { ACCOUNT_SUMMARY_FEATURE } from '@spartacus/organization/account-summary/root';
import { AccountSummary } from '../../model/account-summary';
import {
  AccountSummaryState,
  ACCOUNT_SUMMARY_ENTITIES,
  ACCOUNT_SUMMARY_LIST,
} from '../account-summary-state';
import {
  accountSummaryEntitiesReducer,
  accountSummaryListReducer,
} from './account-summary.reducer';

export function getReducers(): ActionReducerMap<AccountSummaryState> {
  return {
    [ACCOUNT_SUMMARY_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<AccountSummary>(
        ACCOUNT_SUMMARY_ENTITIES,
        accountSummaryEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel, any>(
        ACCOUNT_SUMMARY_LIST,
        accountSummaryListReducer
      ),
    }),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<AccountSummaryState>
> = new InjectionToken<ActionReducerMap<AccountSummaryState>>(
  'OrganizationReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearOrganizationState(
  reducer: ActionReducer<AccountSummaryState, Action>
): ActionReducer<AccountSummaryState, Action> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearOrganizationState];
