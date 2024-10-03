/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ListModel, StateUtils } from '@spartacus/core';
import { UserGroup } from '../../model/user-group.model';
import { B2BUserActions } from '../actions/index';
import * as UserGroupActions from '../actions/user-group.action';

export const userGroupInitialState: UserGroup | undefined = undefined;
export const userGroupsInitialState: ListModel | undefined = undefined;

export function userGroupEntitiesReducer(
  state = userGroupInitialState,
  action: StateUtils.LoaderAction
): UserGroup | undefined {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_SUCCESS:
    case UserGroupActions.CREATE_USER_GROUP_SUCCESS:
    case UserGroupActions.UPDATE_USER_GROUP_SUCCESS:
      return action.payload;
    case B2BUserActions.ASSIGN_B2B_USER_USER_GROUP_SUCCESS:
    case B2BUserActions.UNASSIGN_B2B_USER_USER_GROUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function userGroupsListReducer(
  state = userGroupsInitialState,
  action: StateUtils.LoaderAction
): ListModel | undefined {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUPS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function userGroupAvailableOrderApprovalPermissionsListReducer(
  state = userGroupsInitialState,
  action: StateUtils.LoaderAction
): ListModel | undefined {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_PERMISSIONS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function userGroupAvailablOrgCustomersListReducer(
  state = userGroupsInitialState,
  action: StateUtils.LoaderAction
): ListModel | undefined {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
