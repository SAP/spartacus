import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLanguages from '../reducers/languages.reducer';

export const getLanguagesState = createSelector(
  fromFeature.getSiteContextState,
  (state: fromFeature.SiteContextState) => state.languages
);

export const getLanguagesEntities: MemoizedSelector<any, any> = createSelector(
  getLanguagesState,
  fromLanguages.getLanguagesEntities
);

export const getActiveLanguage: MemoizedSelector<any, string> = createSelector(
  getLanguagesState,
  fromLanguages.getActiveLanguage
);

export const getAllLanguages: MemoizedSelector<any, any> = createSelector(
  getLanguagesEntities,
  entities => {
    return Object.keys(entities).map(isocode => entities[isocode]);
  }
);

export const getLanguagesLoaded: MemoizedSelector<
  any,
  boolean
> = createSelector(getLanguagesState, fromLanguages.getLanguagesLoaded);

export const getLanguagesLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(getLanguagesState, fromLanguages.getLanguagesLoading);
