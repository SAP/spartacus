import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/titles.reducer';

export const getTitlesState = createSelector(
  fromFeature.getCheckoutState,
  (state: fromFeature.CheckoutState) => state.titles
);

export const getTitlesEntites: MemoizedSelector<any, any> = createSelector(
  getTitlesState,
  fromReducer.getTitlesEntites
);

export const getAllTitles: MemoizedSelector<any, any> = createSelector(
  getTitlesEntites,
  entites => {
    return Object.keys(entites).map(code => entites[code]);
  }
);
