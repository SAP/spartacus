import { User } from '@spartacus/user/account/root';

export const UPDATE_USER_ACCOUNT_PROCESS_ID = 'updateUserAccount';

export const USER_ACCOUNT_FEATURE = 'user';

export interface StateWithUserAccount {
  [USER_ACCOUNT_FEATURE]: UserAccountState;
}

export interface UserAccountState {
  account: UserAccountDetailsState;
}

export interface UserAccountDetailsState {
  details: User;
}
