import { MemoizedSelector, createSelector } from '@ngrx/store';

import {
  UserState,
  TitlesState,
  StateWithUser,
  TitleEntities
} from '../user-state';
import { Title } from '../../../occ/occ-models/index';
import { getUserState } from './feature.selector';

export const getTitlesState: MemoizedSelector<
  StateWithUser,
  TitlesState
> = createSelector(
  getUserState,
  (state: UserState) => state.titles
);

export const getTitlesEntites: MemoizedSelector<
  StateWithUser,
  TitleEntities
> = createSelector(
  getTitlesState,
  (state: TitlesState) => state.entities
);

export const getAllTitles: MemoizedSelector<
  StateWithUser,
  Title[]
> = createSelector(
  getTitlesEntites,
  entites => Object.keys(entites).map(code => entites[code])
);

export const titleSelectorFactory = (
  code: string
): MemoizedSelector<StateWithUser, Title> =>
  createSelector(
    getTitlesEntites,
    entities => (Object.keys(entities).length !== 0 ? entities[code] : null)
  );
