import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Title } from '@spartacus/user/profile/root';
import {
  StateWithUserProfile,
  TitleEntities,
  TitlesState,
  UserProfileState,
} from '../user-profile.state';
import { getUserProfileState } from './feature.selector';

export const getTitlesState: MemoizedSelector<
  StateWithUserProfile,
  TitlesState
> = createSelector(
  getUserProfileState,
  (state: UserProfileState) => state.titles
);

export const getTitlesEntities: MemoizedSelector<
  StateWithUserProfile,
  TitleEntities
> = createSelector(getTitlesState, (state: TitlesState) => state.entities);

export const getAllTitles: MemoizedSelector<
  StateWithUserProfile,
  Title[]
> = createSelector(getTitlesEntities, (entities) =>
  Object.keys(entities).map((code) => entities[code])
);

export const titleSelectorFactory = (
  code: string
): MemoizedSelector<StateWithUserProfile, Title> =>
  createSelector(getTitlesEntities, (entities) =>
    Object.keys(entities).length !== 0 ? entities[code] : null
  );
