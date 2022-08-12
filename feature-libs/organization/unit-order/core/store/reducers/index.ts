import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions, ListModel, StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/unit-order.model';
import {
  OrderHistoryState,
  ORDER_APPROVAL_ENTITIES,
  ORDER_APPROVAL_FEATURE,
  ORDER_APPROVAL_LIST,
} from '../unit-order-state';
import {
  orderApprovalsEntitiesReducer,
  orderApprovalsListReducer,
} from './unit-order.reducer';

export function getReducers(): ActionReducerMap<OrderHistoryState> {
  return {
    [ORDER_APPROVAL_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<OrderApproval>(
        ORDER_APPROVAL_ENTITIES,
        orderApprovalsEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel, any>(
        ORDER_APPROVAL_LIST,
        orderApprovalsListReducer
      ),
    }),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<OrderHistoryState>
> = new InjectionToken<ActionReducerMap<OrderHistoryState>>(
  'OrganizationReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearOrganizationState(
  reducer: ActionReducer<OrderHistoryState, Action>
): ActionReducer<OrderHistoryState, Action> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearOrganizationState];
