import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as OrgUnitUserGroupActions from '../actions/org-unit-user-group.action';
import { OrgUnitUserGroup } from 'projects/core/src/model/org-unit-user-group.model';

export const orgUnitUserGroupInitialState = {};
export const orgUnitsUserGroupInitialState = undefined;

export function orgUnitUserGroupEntitiesReducer(
  state: OrgUnitUserGroup = orgUnitUserGroupInitialState,
  action: LoaderAction
): OrgUnitUserGroup {
  switch (action.type) {
  }
  return state;
}

export function orgUnitUserGroupListReducer(
  state = orgUnitsUserGroupInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUPS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
