import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions, ListModel, StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/order-approval.model';
import {
  OrderApprovalState,
  ORDER_APPROVAL_ENTITIES,
  ORDER_APPROVAL_FEATURE,
  ORDER_APPROVAL_LIST,
} from '../order-approval-state';
import {
  orderApprovalsEntitiesReducer,
  orderApprovalsListReducer,
} from './order-approval.reducer';

export function getReducers(): ActionReducerMap<OrderApprovalState> {
  return {
    [ORDER_APPROVAL_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<OrderApproval>(
        ORDER_APPROVAL_ENTITIES,
        orderApprovalsEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel>(
        ORDER_APPROVAL_LIST,
        orderApprovalsListReducer
      ),
    }),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<OrderApprovalState>
> = new InjectionToken<ActionReducerMap<OrderApprovalState>>(
  'OrganizationReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearOrganizationState(
  reducer: ActionReducer<OrderApprovalState, Action>
): ActionReducer<OrderApprovalState, Action> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearOrganizationState];
