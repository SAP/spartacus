import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Language } from '../../../model/misc.model';
import {
  LanguagesEntities,
  LanguagesState,
  SiteContextState,
  StateWithSiteContext,
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
> = createSelector(getLanguagesState, languagesEntitiesSelector);

export const getActiveLanguage: MemoizedSelector<StateWithSiteContext, string> =
  createSelector(getLanguagesState, activeLanguageSelector);

export const getAllLanguages: MemoizedSelector<
  StateWithSiteContext,
  Language[]
> = createSelector(getLanguagesEntities, (entities) => {
  return entities
    ? Object.keys(entities).map((isocode) => entities[isocode])
    : null;
});
