import { User } from '@spartacus/core';

export const UPDATE_USER_DETAILS_PROCESS_ID = 'updateUserDetails';

export const USER_FEATURE = 'user';

export interface StateWithUser {
  [USER_FEATURE]: UserState;
}

export interface UserState {
  account: UserDetailsState;
}

// TODO: consider moving here
export interface UserDetailsState {
  details: User;
}
