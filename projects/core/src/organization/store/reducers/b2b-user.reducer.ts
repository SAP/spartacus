import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as B2BUserActions from '../actions/b2b-user.action';
import { B2BUser } from '../../../model/org-unit.model';

export const b2bUserInitialState = {};
export const b2bUsersInitialState = undefined;

export function b2bUserEntitiesReducer(
  state: B2BUser = b2bUserInitialState,
  action: LoaderAction
): B2BUser {
  switch (action.type) {
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
