import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithUserProfile, UserProfileState } from '../user-profile.state';
import { getUserProfileState } from './feature.selector';

export const getResetPassword: MemoizedSelector<
  StateWithUserProfile,
  boolean
> = createSelector(
  getUserProfileState,
  (state: UserProfileState) => state.resetPassword
);
