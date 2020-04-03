import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as OrgUnitUserGroupActions from '../actions/user-group.action';
import { OrgUnitUserGroup } from '../../../model/user-group.model';

export const orgUnitUserGroupInitialState = {};
export const orgUnitUserGroupsInitialState = undefined;

export function orgUnitUserGroupEntitiesReducer(
  state: OrgUnitUserGroup = orgUnitUserGroupInitialState,
  action: LoaderAction
): OrgUnitUserGroup {
  switch (action.type) {
  }
  return state;
}

export function orgUnitUserGroupsListReducer(
  state = orgUnitUserGroupsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case OrgUnitUserGroupActions.LOAD_USER_GROUPS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function orgUnitUserGroupAvailableOrderApprovalPermissionsListReducer(
  state = orgUnitUserGroupsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case OrgUnitUserGroupActions.LOAD_USER_GROUP_PERMISSIONS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function orgUnitUserGroupAvailablOrgCustomersListReducer(
  state = orgUnitUserGroupsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case OrgUnitUserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
