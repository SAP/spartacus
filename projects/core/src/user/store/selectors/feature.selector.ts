import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import { UserState, USER_FEATURE, StateWithUser } from '../user-state';

export const getUserState: MemoizedSelector<
  StateWithUser,
  UserState
> = createFeatureSelector<UserState>(USER_FEATURE);
