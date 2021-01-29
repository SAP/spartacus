import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithUserAccount,
  UserAccountState,
  USER_ACCOUNT_FEATURE,
} from '../user-account.state';

export const getUserState: MemoizedSelector<
  StateWithUserAccount,
  UserAccountState
> = createFeatureSelector<UserAccountState>(USER_ACCOUNT_FEATURE);
