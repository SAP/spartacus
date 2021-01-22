import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithUser, UserState, USER_FEATURE } from '../user-account.state';

export const getUserState: MemoizedSelector<
  StateWithUser,
  UserState
> = createFeatureSelector<UserState>(USER_FEATURE);
