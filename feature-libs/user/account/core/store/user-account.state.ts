import { User } from '@spartacus/core';

export const UPDATE_USER_ACCOUNT_PROCESS_ID = 'updateUserAccount';

export const USER_FEATURE = 'user';

export interface StateWithUser {
  [USER_FEATURE]: UserState;
}

export interface UserState {
  account: UserAccountState;
}

// TODO: consider moving here
export interface UserAccountState {
  details: User;
}
