import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers/index';
import * as fromReducer from './../reducers/titles.reducer';
import { UserState, TitlesState } from '../user-state';
import { Title } from '../../../occ/occ-models/index';

export const getTitlesState: MemoizedSelector<
  any,
  TitlesState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.titles
);

export const getTitlesEntites: MemoizedSelector<
  any,
  { [code: string]: any }
> = createSelector(
  getTitlesState,
  fromReducer.getTitlesEntites
);

export const getAllTitles: MemoizedSelector<any, Title[]> = createSelector(
  getTitlesEntites,
  entites => {
    return Object.keys(entites).map(code => entites[code]);
  }
);

export const titleSelectorFactory = (code): MemoizedSelector<any, Title> => {
  return createSelector(
    getTitlesEntites,
    entities => {
      if (Object.keys(entities).length !== 0) {
        return entities[code];
      } else {
        return null;
      }
    }
  );
};
