import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { StateWithUser, USER_FEATURE, UserState } from '../user-state';

export const getUserState: MemoizedSelector<
  StateWithUser,
  UserState
> = createFeatureSelector<UserState>(USER_FEATURE);
