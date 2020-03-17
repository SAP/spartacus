import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as OrgUnitCustomerActions from '../actions/org-unit-customer.action';
import { OrgUnitCustomer } from '../../../model';

export const orgUnitCustomerInitialState = {};
export const orgUnitCustomersInitialState = undefined;

export function orgUnitCustomerEntitiesReducer(
  state: OrgUnitCustomer = orgUnitCustomerInitialState,
  action: LoaderAction
): OrgUnitCustomer {
  switch (action.type) {
  }
  return state;
}

export function orgUnitCustomerListReducer(
  state = orgUnitCustomersInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case OrgUnitCustomerActions.LOAD_ORG_UNIT_CUSTOMERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
