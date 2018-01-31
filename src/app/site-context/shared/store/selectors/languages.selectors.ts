import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLanguages from '../reducers/languages.reducer';

export const getLanguagesState = createSelector(
  fromFeature.getSiteContextState,
  (state: fromFeature.SiteContextState) => state.languages
);

export const getLanguagesEntities = createSelector(
  getLanguagesState,
  fromLanguages.getLanguagesEntities
);

export const getActiveLanguage = createSelector(
  getLanguagesState,
  fromLanguages.getActiveLanguage
);

export const getAllLanguages = createSelector(
  getLanguagesEntities,
  entities => {
    return Object.keys(entities).map(isocode => entities[isocode]);
  }
);

export const getLanguagesLoaded = createSelector(
  getLanguagesState,
  fromLanguages.getLanguagesLoaded
);
