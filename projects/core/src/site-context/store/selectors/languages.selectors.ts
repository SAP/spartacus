import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Language } from '../../../occ/occ-models/occ.models';
import {
  StateWithSiteContext,
  LanguagesState,
  LanguagesEntities,
  SiteContextState
} from '../state';

import { getSiteContextState } from './site-context.selector';

const activeLanguageSelector = (state: LanguagesState) => state.activeLanguage;
const languagesEntitiesSelector = (state: LanguagesState) => state.entities;

export const getLanguagesState: MemoizedSelector<
  StateWithSiteContext,
  LanguagesState
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.languages
);

export const getLanguagesEntities: MemoizedSelector<
  StateWithSiteContext,
  LanguagesEntities
> = createSelector(
  getLanguagesState,
  languagesEntitiesSelector
);

export const getActiveLanguage: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(
  getLanguagesState,
  activeLanguageSelector
);

export const getAllLanguages: MemoizedSelector<
  StateWithSiteContext,
  Language[]
> = createSelector(
  getLanguagesEntities,
  entities => {
    return Object.keys(entities).map(isocode => entities[isocode]);
  }
);
