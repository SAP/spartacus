import { StateUtils } from '@spartacus/core';
import { B2BUnitNode } from '../../model/unit-node.model';
import { OrgUnitActions } from '../actions/index';

export const orgUnitInitialState = undefined;
export const orgUnitsInitialState = undefined;

export function orgUnitEntitiesReducer(
  state: B2BUnitNode = orgUnitInitialState,
  action: StateUtils.LoaderAction
): B2BUnitNode {
  switch (action.type) {
    case OrgUnitActions.LOAD_ORG_UNIT_SUCCESS:
    case OrgUnitActions.CREATE_ORG_UNIT_SUCCESS:
      return action.payload;
    case OrgUnitActions.UPDATE_ORG_UNIT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function orgUnitListReducer(
  state = orgUnitsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
  }
  return state;
}

export function orgUnitUserListReducer(
  state = orgUnitsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case OrgUnitActions.LOAD_ASSIGNED_USERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function orgUnitAddressListReducer(
  state = orgUnitsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case OrgUnitActions.LOAD_ADDRESSES_SUCCESS:
      return action.payload.page;
  }
  return state;
}
