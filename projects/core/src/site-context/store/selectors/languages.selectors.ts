import { createSelector, MemoizedSelector } from '@ngrx/store';

import { LanguagesState, SiteContextState } from '../state';
import { getSiteContextState } from './site-context.selector';

const activeLanguageSelector = (state: LanguagesState) => state.activeLanguage;
const languagesEntitiesSelector = (state: LanguagesState) => state.entities;
const languagesLoadAttemptedSelector = (state: LanguagesState) =>
  state.loadAttempted;
const languagesLoadingSelector = (state: LanguagesState) => state.loading;

export const getLanguagesState = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.languages
);

export const getLanguagesEntities: MemoizedSelector<any, any> = createSelector(
  getLanguagesState,
  languagesEntitiesSelector
);

export const getActiveLanguage: MemoizedSelector<any, string> = createSelector(
  getLanguagesState,
  activeLanguageSelector
);

export const getAllLanguages: MemoizedSelector<any, any> = createSelector(
  getLanguagesEntities,
  entities => {
    return Object.keys(entities).map(isocode => entities[isocode]);
  }
);

export const getLanguagesLoadAttempted: MemoizedSelector<
  any,
  boolean
> = createSelector(getLanguagesState, languagesLoadAttemptedSelector);

export const getLanguagesLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(getLanguagesState, languagesLoadingSelector);
