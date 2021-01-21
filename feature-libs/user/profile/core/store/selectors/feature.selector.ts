import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithUserProfile,
  UserProfileState,
  USER_PROFILE_FEATURE,
} from '../user-profile.state';

export const getUserProfileState: MemoizedSelector<
  StateWithUserProfile,
  UserProfileState
> = createFeatureSelector<UserProfileState>(USER_PROFILE_FEATURE);
