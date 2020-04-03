import { B2BUnitNode } from '../../../model/org-unit.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { OrgUnitActions } from '../actions/index';

export const orgUnitInitialState = {};
export const orgUnitsInitialState = undefined;

export function orgUnitEntitiesReducer(
  state: B2BUnitNode = orgUnitInitialState,
  action: LoaderAction
): B2BUnitNode {
  switch (action.type) {
  }
  return state;
}

export function orgUnitListReducer(
  state = orgUnitsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
  }
  return state;
}

export function orgUnitUserListReducer(
  state = orgUnitsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case OrgUnitActions.LOAD_ASSIGNED_USERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function orgUnitAddressListReducer(
  state = orgUnitsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case OrgUnitActions.LOAD_ADDRESSES_SUCCESS:
      return action.payload.page;
  }
  return state;
}
