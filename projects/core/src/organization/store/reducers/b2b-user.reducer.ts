import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { B2BUserActions, OrgUnitActions } from '../actions/index';
import { B2BUser } from '../../../model/org-unit.model';

export const b2bUserInitialState = {};
export const b2bUsersInitialState = undefined;

export function b2bUserEntitiesReducer(
  state: B2BUser = b2bUserInitialState,
  action: LoaderAction
): B2BUser {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_SUCCESS:
      return action.payload;
    case OrgUnitActions.ASSIGN_ROLE_SUCCESS:
    case OrgUnitActions.UNASSIGN_ROLE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function userListReducer(
  state = b2bUsersInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
